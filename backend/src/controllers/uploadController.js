import Update from '../models/Update.js';
import Campaign from '../models/Campaign.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { uploadCampaignImages as uploadImages } from '../utils/imageUploadUtils.js';

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

/**
 * Upload campaign images
 * POST /api/campaigns/:id/images
 * Allows campaign creators to upload multiple images during campaign creation or editing
 */
export const uploadCampaignImages = async (req, res) => {
	try {
		const { id } = req.params;

		// Validate campaign exists and user is authorized
		const campaign = await Campaign.findById(id);
		if (!campaign) {
			return res.status(404).json({ message: 'Campaign not found' });
		}

		if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Not authorized to upload images for this campaign' });
		}

		// Check if files were provided
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No images provided' });
		}

		// Upload images using utility function
		const uploadedImages = await uploadImages(req.files, id);

		// Extract only URLs for saving to database
		const imageUrls = uploadedImages.map((img) => img.url);

		// Add images to campaign
		campaign.images.push(...imageUrls);
		await campaign.save();

		res.status(201).json({
			message: 'Images uploaded successfully',
			images: uploadedImages,
			campaign,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * Reorder campaign images
 * PUT /api/campaigns/:id/images/reorder
 * Allows users to rearrange the order of campaign images
 */
export const reorderCampaignImages = async (req, res) => {
	try {
		const { id } = req.params;
		const { imageOrder } = req.body;

		// Validate input
		if (!imageOrder || !Array.isArray(imageOrder)) {
			return res.status(400).json({ message: 'Invalid image order provided' });
		}

		// Get campaign and validate authorization
		const campaign = await Campaign.findById(id);
		if (!campaign) {
			return res.status(404).json({ message: 'Campaign not found' });
		}

		if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Not authorized to modify this campaign' });
		}

		// Update image order
		campaign.images = imageOrder;
		await campaign.save();

		res.status(200).json({
			message: 'Image order updated successfully',
			images: campaign.images,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * Delete campaign image
 * DELETE /api/campaigns/:id/images/:imageUrl
 * Allows campaign creators to remove specific images
 */
export const deleteCampaignImage = async (req, res) => {
	try {
		const { id, imageUrl } = req.params;
		const decodedUrl = decodeURIComponent(imageUrl);

		// Get campaign and validate authorization
		const campaign = await Campaign.findById(id);
		if (!campaign) {
			return res.status(404).json({ message: 'Campaign not found' });
		}

		if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Not authorized to modify this campaign' });
		}

		// Remove image from campaign
		campaign.images = campaign.images.filter((img) => img !== decodedUrl);
		await campaign.save();

		res.status(200).json({
			message: 'Image deleted successfully',
			images: campaign.images,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * Set featured image
 * PUT /api/campaigns/:id/featured-image
 * Sets the primary image to display for the campaign
 */
export const setFeaturedImage = async (req, res) => {
	try {
		const { id } = req.params;
		const { imageUrl } = req.body;

		if (!imageUrl) {
			return res.status(400).json({ message: 'Image URL is required' });
		}

		// Get campaign and validate authorization
		const campaign = await Campaign.findById(id);
		if (!campaign) {
			return res.status(404).json({ message: 'Campaign not found' });
		}

		if (campaign.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
			return res.status(403).json({ message: 'Not authorized to modify this campaign' });
		}

		// Update featured image
		campaign.featuredImage = imageUrl;
		await campaign.save();

		res.status(200).json({
			message: 'Featured image updated successfully',
			featuredImage: campaign.featuredImage,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
