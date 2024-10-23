interface Topic {
  id: string;
  slug: string;
  title: string;
}

interface TopicMenuProps {
  topics: Topic[];
  onSelectTopic: (topic: string) => void;
}

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageGridProps {
  photos: Photo[];
}