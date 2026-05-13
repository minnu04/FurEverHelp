import { motion } from 'framer-motion';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

const ImagePreview = ({ image, index, total, onRemove, onMoveUp, onMoveDown }) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group"
    >
      {/* Image Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <img
            src={image.preview}
            alt={image.name}
            className="w-full h-full object-cover"
          />

          {/* Index Badge */}
          <div className="absolute top-2 left-2 bg-rose-400 text-white px-2 py-1 rounded text-xs font-semibold">
            #{index + 1}
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            {/* Remove Button */}
            <button
              onClick={onRemove}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Info */}
        <div className="p-3">
          <p className="text-xs text-gray-600 truncate mb-2">{image.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
        </div>
      </div>

      {/* Reorder Buttons */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded flex items-center justify-center gap-1 text-xs font-medium transition-colors"
          title="Move up"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Up</span>
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 rounded flex items-center justify-center gap-1 text-xs font-medium transition-colors"
          title="Move down"
        >
          <span>Down</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ImagePreview;
