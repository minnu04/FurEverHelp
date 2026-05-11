import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, AlertCircle } from 'lucide-react';
import ImagePreview from './ImagePreview';
import useToast from '../hooks/useToast';
import { ToastContainer } from './Toast';
import API from '../api/axiosInstance';

const ImageUploader = ({ campaignId, onImagesUpload, maxImages = 10 }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const { toasts, addToast, removeToast } = useToast();

  // Allowed file types
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Validate file
  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit.');
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    setError('');

    if (selectedImages.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      addToast(`Maximum ${maxImages} images allowed`, 'warning');
      return;
    }

    const validFiles = Array.from(files).filter((file) => {
      if (!validateFile(file)) {
        addToast(`Invalid file: ${file.name}`, 'error');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newImages = validFiles.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      setSelectedImages((prev) => [...prev, ...newImages]);
      addToast(`${validFiles.length} image(s) selected`, 'success');
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // Remove image
  const removeImage = (id) => {
    setSelectedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image && image.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
    addToast('Image removed', 'info');
  };

  // Reorder images (move up)
  const moveImageUp = (index) => {
    if (index > 0) {
      const newImages = [...selectedImages];
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
      setSelectedImages(newImages);
    }
  };

  // Reorder images (move down)
  const moveImageDown = (index) => {
    if (index < selectedImages.length - 1) {
      const newImages = [...selectedImages];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      setSelectedImages(newImages);
    }
  };

  // Upload images to server
  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      addToast('Please select at least one image', 'warning');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('images', image.file);
      });

      const response = await API.post(`/campaigns/${campaignId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addToast(`${selectedImages.length} image(s) uploaded successfully!`, 'success');

      // Pass uploaded images to parent component
      if (onImagesUpload) {
        onImagesUpload(response.data.images);
      }

      // Clear selected images
      setSelectedImages([]);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to upload images';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`transition-all duration-300 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          dragActive
            ? 'border-rose-400 bg-rose-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-3 w-full"
        >
          <div className="bg-gradient-to-br from-rose-200 to-orange-100 p-4 rounded-full">
            <Upload className="w-8 h-8 text-rose-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Drag and drop images here</p>
            <p className="text-sm text-gray-600">or click to select files</p>
          </div>
          <p className="text-xs text-gray-500">
            Supported formats: JPG, JPEG, PNG, WEBP (Max 5MB per image)
          </p>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Selected Images Grid */}
      {selectedImages.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Selected Images ({selectedImages.length}/{maxImages})
            </h3>
            <button
              type="button"
              onClick={() => {
                selectedImages.forEach((img) => {
                  if (img.preview) {
                    URL.revokeObjectURL(img.preview);
                  }
                });
                setSelectedImages([]);
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {selectedImages.map((image, index) => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  index={index}
                  total={selectedImages.length}
                  onRemove={() => removeImage(image.id)}
                  onMoveUp={() => moveImageUp(index)}
                  onMoveDown={() => moveImageDown(index)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Upload Button */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 to-orange-400 text-white rounded-lg font-semibold hover:from-rose-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
