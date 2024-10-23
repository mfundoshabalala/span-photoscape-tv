import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGridProps {
  photos: Photo[];
  isGridActive: boolean;
  // onImageFocus: () => void;
  // onImageBlur: () => void;
}

const PhotoGrid: React.FC<ImageGridProps> = ({ photos }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftCaret, setShowLeftCaret] = useState(false);
  const [showRightCaret, setShowRightCaret] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftCaret(container.scrollLeft > 0);
      setShowRightCaret(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <div className="relative w-full h-full mx-auto">
      {/* Left Navigation Button */}
      {showLeftCaret && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full p-2 shadow-lg rounded-md border-2 border-gray-600 transition-colors"
          aria-label="Scroll left">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {/* Image Grid Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-x-auto scroll-smooth no-scrollbar px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="grid grid-flow-col auto-cols-max gap-2 h-full grid-rows-2 rounded-md">
          {photos.map((photo) => (
            <div key={photo.id} className="rounded-lg overflow-hidden aspect-video h-32 sm:h-48 md:h-64 lg:h-80">
              <img
                src={photo.urls.regular}
                alt={photo.alt_description || 'Photo'}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Navigation Button */}
      {showRightCaret && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full p-2 shadow-lg rounded-md border-2 border-gray-600 transition-colors"
          aria-label="Scroll right">
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PhotoGrid;