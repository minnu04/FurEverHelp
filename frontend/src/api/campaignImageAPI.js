import API from './axiosInstance';

// Campaign Image API utilities

/**
 * Upload images to a campaign
 * @param {string} campaignId - Campaign ID
 * @param {FormData} formData - FormData object with images
 * @returns {Promise} - Response with uploaded images
 */
export const uploadCampaignImages = async (campaignId, formData) => {
  try {
    const response = await API.post(`/campaigns/${campaignId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete image from campaign
 * @param {string} campaignId - Campaign ID
 * @param {string} imageUrl - Image URL to delete
 * @returns {Promise} - Response confirming deletion
 */
export const deleteCampaignImage = async (campaignId, imageUrl) => {
  try {
    const encodedUrl = encodeURIComponent(imageUrl);
    const response = await API.delete(`/campaigns/${campaignId}/images/${encodedUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Reorder images in a campaign
 * @param {string} campaignId - Campaign ID
 * @param {Array} imageOrder - Array of image URLs in new order
 * @returns {Promise} - Response with reordered images
 */
export const reorderCampaignImages = async (campaignId, imageOrder) => {
  try {
    const response = await API.put(`/campaigns/${campaignId}/images/reorder`, {
      imageOrder,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Set featured image for campaign
 * @param {string} campaignId - Campaign ID
 * @param {string} imageUrl - Image URL to set as featured
 * @returns {Promise} - Response with updated featured image
 */
export const setFeaturedImage = async (campaignId, imageUrl) => {
  try {
    const response = await API.put(`/campaigns/${campaignId}/featured-image`, {
      imageUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadCampaignImages,
  deleteCampaignImage,
  reorderCampaignImages,
  setFeaturedImage,
};
