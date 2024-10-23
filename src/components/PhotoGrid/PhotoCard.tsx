import React from 'react';

interface PhotoCardProps {
  photo: Photo;
  isFocused: boolean;
  onClick: () => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isFocused, onClick, onFocus, onKeyDown }) => {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className={`border-2 border-transparent rounded-lg overflow-hidden aspect-video h-32 sm:h-48 md:h-64 lg:h-80 ${
        isFocused ? 'border-purple-500' : ''
      }`}
      aria-label={`Image ${photo.id}`}>
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || 'Photo'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PhotoCard;
