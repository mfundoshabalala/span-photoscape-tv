import React from 'react';

const TopicMenu: React.FC<TopicMenuProps> = ({ topics = [], onSelectTopic }) => {
	if (!topics || topics.length === 0) {
		<div className="topic-menu">
			<h2 className="text-xl font-semibold mb-2">Topics</h2>
			<p>No topics available</p>
		</div>
	}

	return (
		<div className="topic-menu">
			{/* <h2 className="text-xl font-semibold mb-2">Topics</h2> */}
			<ul className="flex flex-col gap-y-1 overflow-x-auto p-4 list-none">
				{topics.map((topic) => (
					<li key={topic.id}>
						<button type='button'
							className="w-56 rounded-none text-sm px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
							onClick={() => onSelectTopic(topic.slug)}>
						{topic.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TopicMenu;