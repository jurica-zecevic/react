import styles from './IconButton.module.css';

const IconButton = ({ hasBackground, icon, onClick }) => {
	return (
		<>
			<button
				className={`${styles.iconButton} ${
					hasBackground ? styles.iconButtonHasBackground : ''
				}`}
				onClick={onClick}
			>
				{icon}
			</button>
		</>
	);
};

export default IconButton;
