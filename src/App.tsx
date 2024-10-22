/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './App.css'
import TopicMenu from './components/Navigation/TopicMenu';
import { fetchPhotos, fetchTopics } from './services/api';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        setError('Failed to load topics');
        console.error('Error loading topics: ', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      const loadPhotos = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const fetchedPhotos = await fetchPhotos(selectedTopic);
          setPhotos(fetchedPhotos);
        } catch (error) {
          setError('Error to load photos');
          console.log('Error loading photos: ', error);
        } finally {
          setIsLoading(false);
        }
      }
      loadPhotos();
    }
  }, [selectedTopic]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold mb-4">PhotoScape TV</h1>
      { isLoading ? (
        <div>Loading</div> //FIXME: add a loading spinner
      ) : (
        <>
          <TopicMenu topics={topics} onSelectTopic={handleTopicSelect} />
          {selectedTopic && <PhotoGrid photos={photos} />}
        </>
      )}
    </div>
  );
}

export default App
