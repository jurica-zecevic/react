import styles from './IconButton.module.css';

const IconButton = ({ icon, onClick }) => {
	return (
		<>
			<button className={styles.iconButton} onClick={onClick}>
				{icon}
			</button>
		</>
	);
};

export default IconButton;
