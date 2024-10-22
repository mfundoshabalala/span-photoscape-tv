const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="overflow-x-auto">
      <div className="photo-grid grid grid-rows-2 grid-flow-col gap-4">
        {photos.map((photo) => (
          <div key={photo.id}
            className="photo-item w-full aspect-video sm:w-48 md:w-64 lg:w-80 xl:w-96 2xl:w-[30rem]">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
