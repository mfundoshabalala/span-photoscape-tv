import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PhotoCard from './PhotoCard';

interface ImageGridProps {
  photos: Photo[];
  isGridActive: boolean;
  onImageBlur?: () => void;
  onImageFocus?: (index: number) => void;
}

const PhotoGrid: React.FC<ImageGridProps> = ({ photos, isGridActive, onImageFocus }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'ArrowRight' && index < photos.length - 1) {
      setFocusedIndex(index + 1);
      scrollContainerRef.current?.children[index + 1].scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1);
      scrollContainerRef.current?.children[index - 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (focusedIndex !== null && onImageFocus) {
      onImageFocus(focusedIndex);
    }
  }, [focusedIndex, onImageFocus]);

  return (
    <div className="relative w-full h-full mx-auto">
      {/* Left Navigation Button */}
      {isGridActive && showLeftCaret && (
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
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFocused={focusedIndex === index}
              onClick={() => setFocusedIndex(index)}
              onFocus={() => setFocusedIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
      </div>

      {/* Right Navigation Button */}
      {isGridActive && showRightCaret && (
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
