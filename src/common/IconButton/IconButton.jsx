import styles from './IconButton.module.css';

const IconButton = ({ background, icon, onClick }) => {
	return (
		<>
			<button
				className={`${styles.iconButton} ${
					background ? styles.iconButtonBackground : ''
				}`}
				onClick={onClick}
			>
				{icon}
			</button>
		</>
	);
};

export default IconButton;
