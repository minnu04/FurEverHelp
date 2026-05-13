import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

const GalleryModal = ({ images = [], initialIndex = 0, campaignTitle = '', onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const modalRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle swipe gesture
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Download image
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `${campaignTitle}-${currentIndex + 1}.jpg`;
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors shadow-lg"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Download Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            downloadImage();
          }}
          className="absolute top-4 left-4 z-20 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors shadow-lg"
          title="Download"
        >
          <Download className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center px-4"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${campaignTitle} - Image ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[90vh] object-contain"
            />
          </AnimatePresence>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors shadow-lg"
              title="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors shadow-lg"
              title="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>

        {/* Image Counter and Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center gap-4">
          <span className="font-medium">
            {currentIndex + 1} / {images.length}
          </span>
          <p className="text-sm">{campaignTitle}</p>
        </div>

        {/* Keyboard/Swipe Instructions */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-center text-sm opacity-70">
          <p>Use arrow keys, swipe, or click buttons to navigate</p>
          <p>Press ESC to close</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;
