import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import GalleryModal from './GalleryModal';

const CampaignGallery = ({ images = [], campaignTitle = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-medium">No images available</p>
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${campaignTitle} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full transition-colors shadow-md"
          title="View fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full transition-colors shadow-md"
            title="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full transition-colors shadow-md"
            title="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Thumbnail Navigation Toggle */}
      {images.length > 1 && (
        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
        >
          {showThumbnails ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Thumbnails
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Thumbnails
            </>
          )}
        </button>
      )}

      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-rose-400 shadow-md'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-rose-400 bg-opacity-20" />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Keyboard Navigation Info */}
      {images.length > 1 && (
        <p className="text-xs text-gray-500 text-center">
          Use arrow keys or buttons to navigate through images
        </p>
      )}

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <GalleryModal
          images={images}
          initialIndex={currentIndex}
          campaignTitle={campaignTitle}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CampaignGallery;
