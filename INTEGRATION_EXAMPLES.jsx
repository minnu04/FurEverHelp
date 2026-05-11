/**
 * INTEGRATION EXAMPLES
 * How to integrate campaign image upload system into existing pages
 */

// =====================================================
// Example 1: Campaign Details Page with Gallery
// =====================================================

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axiosInstance';
import CampaignGallery from '../components/CampaignGallery';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

export const CampaignDetailsExample = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await API.get(`/campaigns/${id}`);
        setCampaign(response.data);
        addToast('Campaign loaded successfully', 'success');
      } catch (error) {
        addToast(error.response?.data?.message || 'Failed to load campaign', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Campaign Gallery */}
      <div className="mb-8">
        <CampaignGallery images={campaign.images} campaignTitle={campaign.title} />
      </div>

      {/* Campaign Details */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-600 mb-4">{campaign.description}</p>

          {/* Other campaign details */}
        </div>

        {/* Sidebar with fundraising info */}
        <div className="md:col-span-1">
          {/* Donation card, etc */}
        </div>
      </div>
    </div>
  );
};

// =====================================================
// Example 2: Campaign Creation/Edit Page with Upload
// =====================================================

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';
import API from '../api/axiosInstance';

export const CampaignCreateExample = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    goalAmount: '',
    deadline: '',
    petSpecies: 'Dog',
  });
  const [campaignId, setCampaignId] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Step 1: Create campaign first
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await API.post('/campaigns', {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        goalAmount: parseFloat(formData.goalAmount),
        deadline: formData.deadline,
        pet: {
          species: formData.petSpecies,
        },
      });

      setCampaignId(response.data._id);
      addToast('Campaign created! Now upload images.', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to create campaign', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Handle uploaded images
  const handleImagesUpload = (images) => {
    setUploadedImages(images);
    addToast(`${images.length} image(s) uploaded successfully!`, 'success');
  };

  // Step 3: Finalize (optional additional processing)
  const handleFinalize = async () => {
    if (uploadedImages.length === 0) {
      addToast('Please upload at least one image', 'warning');
      return;
    }

    addToast('Campaign created with all images!', 'success');
    // Redirect to campaign details page
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>

      {/* Campaign Form */}
      {!campaignId ? (
        <form onSubmit={handleCreateCampaign} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Enter campaign title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              rows="4"
              placeholder="Enter campaign description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="">Select category</option>
                <option value="Medical Care">Medical Care</option>
                <option value="Rescue & Shelter">Rescue & Shelter</option>
                <option value="Adoption Support">Adoption Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Goal Amount ($)</label>
              <input
                type="number"
                required
                value={formData.goalAmount}
                onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Enter goal amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deadline</label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-rose-400 to-orange-400 text-white rounded-lg font-semibold hover:from-rose-500 hover:to-orange-500 disabled:opacity-50 transition-all"
          >
            {submitting ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      ) : (
        <>
          {/* Image Upload Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upload Campaign Images</h2>
            <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-6 rounded-lg">
              <ImageUploader
                campaignId={campaignId}
                onImagesUpload={handleImagesUpload}
                maxImages={10}
              />
            </div>
          </div>

          {/* Completion Button */}
          <button
            onClick={handleFinalize}
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
          >
            Complete Campaign Setup
          </button>
        </>
      )}
    </div>
  );
};

// =====================================================
// Example 3: Campaign Editor (for existing campaigns)
// =====================================================

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import CampaignGallery from '../components/CampaignGallery';
import useToast from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';
import API from '../api/axiosInstance';
import { Trash2 } from 'lucide-react';

export const CampaignEditExample = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await API.get(`/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        addToast('Failed to load campaign', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleImagesUpload = (newImages) => {
    setCampaign((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newImages.map((img) => img.url)],
    }));
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await API.delete(`/campaigns/${id}/images/${encodeURIComponent(imageUrl)}`);
      setCampaign((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));
      addToast('Image deleted successfully', 'success');
    } catch (error) {
      addToast('Failed to delete image', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <h1 className="text-3xl font-bold mb-8">Edit Campaign: {campaign.title}</h1>

      {/* Current Gallery */}
      {campaign.images && campaign.images.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Images</h2>
          <CampaignGallery images={campaign.images} campaignTitle={campaign.title} />

          {/* Delete Individual Images */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {campaign.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Campaign image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(image)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="text-red-500 w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload More Images */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add More Images</h2>
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-6 rounded-lg">
          <ImageUploader
            campaignId={id}
            onImagesUpload={handleImagesUpload}
            maxImages={10}
          />
        </div>
      </div>
    </div>
  );
};

export default {
  CampaignDetailsExample,
  CampaignCreateExample,
  CampaignEditExample,
};
