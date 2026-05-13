import { uploadToCloudinary } from '../config/cloudinary.js';

/**
 * Upload a single image file to Cloudinary
 * @param {Object} file - Multer file object
 * @param {string} campaignId - Campaign ID for folder organization
 * @returns {Promise<Object>} - Upload result with URL and metadata
 */
export const uploadCampaignImage = async (file, campaignId) => {
	try {
		if (!file) {
			throw new Error('No file provided');
		}

		// Validate file size (5MB max)
		const fileSizeInMB = file.size / (1024 * 1024);
		if (fileSizeInMB > 5) {
			throw new Error('File size exceeds 5MB limit');
		}

		const result = await uploadToCloudinary(file.buffer, {
			folder: `fur-ever-help/campaigns/${campaignId}`,
			publicId: `${Date.now()}-${file.originalname}`,
			resourceType: 'image',
		});

		return {
			url: result.secure_url,
			publicId: result.public_id,
			filename: file.originalname,
			uploadedAt: new Date(),
		};
	} catch (error) {
		throw new Error(`Image upload failed: ${error.message}`);
	}
};

/**
 * Upload multiple campaign images
 * @param {Array} files - Array of multer file objects
 * @param {string} campaignId - Campaign ID
 * @returns {Promise<Array>} - Array of upload results
 */
export const uploadCampaignImages = async (files, campaignId) => {
	try {
		if (!files || files.length === 0) {
			throw new Error('No files provided for upload');
		}

		const uploadPromises = files.map((file) => uploadCampaignImage(file, campaignId));
		const results = await Promise.all(uploadPromises);

		return results;
	} catch (error) {
		throw new Error(`Batch upload failed: ${error.message}`);
	}
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the image
 * @returns {Promise<void>}
 */
export const deleteCampaignImage = async (publicId) => {
	try {
		// Cloudinary deletion would go here if needed
		// For now, we'll handle it through the API response
		console.log(`Marked image for deletion: ${publicId}`);
	} catch (error) {
		throw new Error(`Image deletion failed: ${error.message}`);
	}
};
