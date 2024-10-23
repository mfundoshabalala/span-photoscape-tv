/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';
import { useEffect, useState } from 'react';
import TopicMenu from './components/Navigation/TopicMenu';
import { fetchPhotos, fetchTopics } from './services/api';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import PhotoGrid from './components/PhotoGrid/PhotoGrid';

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGridActive, setIsGridActive] = useState(false);

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
    };
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
          setIsGridActive(true);
        } catch (error) {
          setError('Error loading photos');
          console.log('Error loading photos: ', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadPhotos();
    } else {
      setIsGridActive(false);
    }
  }, [selectedTopic]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  // const handleImageFocus = () => {
  //   setIsGridActive(true);
  // };

  // const handleImageBlur = () => {
  //   setIsGridActive(false);
  // };

  const handleBackToTopics = () => {
    setIsGridActive(false);
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="main-layout">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className={`topic-menu-container ${isGridActive ? 'hidden' : ''}`}>
              <TopicMenu topics={topics} onSelectTopic={handleTopicSelect} />
            </div>

            <section className={`flex-1 overflow-x-auto ${isGridActive ? 'grid-active' : ''}`}>
              {selectedTopic ? (
                <>
                  <button
                    className="mb-4 p-2 bg-blue-500 text-white rounded"
                    onClick={handleBackToTopics}>
                    Back to Topics
                  </button>

                  <PhotoGrid
                    photos={photos}
                    // onImageFocus={handleImageFocus}
                    // onImageBlur={handleImageBlur}
                    isGridActive={isGridActive}
                  />
                </>
              ) : (
                <div className="h-full text-center p-4 flex items-center justify-center">
                  Select a topic to view photos
                </div>
              )}
            </section>
          </>
        )}
      </div>
      <Footer />

      {/* <style>{`
        .topic-menu-container {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 250px;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .topic-menu-container:hover {
          transform: translateX(0);
        }

        .grid-active .topic-menu-container {
          display: none;
        }

        .main-layout {
          display: flex;
          position: relative;
        }
      `}</style> */}
    </div>
  );
}

export default App;
