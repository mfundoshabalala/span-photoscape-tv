import axios from "axios";

export const fetchTopics = async (): Promise<Topic[]> => {
	const TOPICS_URL = 'https://api.unsplash.com/topics';
	try {
		const response = await axios.get(TOPICS_URL, {
			headers: {
				Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
			},
			params: {
				per_page: 10 // NOTE: Limiting to 10 topics as per requirements
			},
		});
		return response.data?.map((topic: Topic) => ({
			id: topic.id,
			slug: topic.slug,
			title: topic.title
		}));
	} catch (error) {
		console.error('Error fetching topics:', error);
		return [];
	}
};

export const fetchPhotos = async (topic: string) => {
	const PHOTOS_URL = `https://api.unsplash.com/topics/${topic}/photos`;
	try {
		const response = await axios.get(PHOTOS_URL, {
			headers: {
				Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
			},
			params: {
				per_page: 3*3*4
			},
		});
		return response.data;
	} catch (error) {
		console.log('Error fetching photos for topic:', error);
		return [];
	}
};