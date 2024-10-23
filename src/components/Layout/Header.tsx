interface HeaderProps {
	handleShowTopics: () => void;
	isGridActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleShowTopics, isGridActive }) => {
	return (
		<header className="header flex">
			{ isGridActive &&
				<button
					className="text-white rounded"
					onClick={handleShowTopics}>
				Show Topics
				</button>
			}
			<h1 className="flex-1">PhotoScape TV</h1>
		</header>
	);
};

export default Header;