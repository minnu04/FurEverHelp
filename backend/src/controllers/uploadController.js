import Update from '../models/Update.js';
import Campaign from '../models/Campaign.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

const uploadBuffer = async (file, folder) => {
	const result = await uploadToCloudinary(file.buffer, {
		folder,
		publicId: `${Date.now()}-${file.originalname}`,
	});

	return {
		url: result.secure_url,
		publicId: result.public_id,
		resourceType: result.resource_type,
	};
};

export const uploadMedia = async (req, res) => {
	try {
		const files = toArray(req.files);

		if (files.length === 0) {
			return res.status(400).json({ message: 'No files provided' });
		}

		const uploads = await Promise.all(
			files.map((file) => uploadBuffer(file, 'fur-ever-help/transparency'))
		);

		res.status(201).json({ files: uploads });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createCampaignUpdate = async (req, res) => {
	try {
		const campaign = await Campaign.findById(req.params.id);

		if (!campaign) {
			return res.status(404).json({ message: 'Campaign not found' });
		}

		if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Not authorized to update this campaign' });
		}

		const files = toArray(req.files);
		const uploadedFiles = files.length
			? await Promise.all(files.map((file) => uploadBuffer(file, 'fur-ever-help/updates')))
			: [];

		const images = uploadedFiles
			.filter((file) => file.resourceType !== 'video')
			.map((file) => file.url);

		const videos = uploadedFiles
			.filter((file) => file.resourceType === 'video')
			.map((file) => file.url);

		const update = await Update.create({
			campaign: campaign._id,
			createdBy: req.user._id,
			title: req.body.title,
			description: req.body.description,
			treatmentStatus: req.body.treatmentStatus || campaign.treatmentStatus,
			images,
			documents: req.body.documents || [],
		});

		if (images.length > 0) {
			campaign.images.push(...images);
		}

		if (videos.length > 0) {
			campaign.videos.push(...videos);
		}

		if (req.body.treatmentStatus) {
			campaign.treatmentStatus = req.body.treatmentStatus;
		}

		await campaign.save();

		res.status(201).json(update);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getCampaignUpdates = async (req, res) => {
	try {
		const updates = await Update.find({ campaign: req.params.id })
			.populate('createdBy', 'name role')
			.sort({ createdAt: -1 });

		res.status(200).json(updates);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
