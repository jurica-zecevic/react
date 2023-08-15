import styles from './Button.module.css';

const Button = ({ buttonText, ...attributes }) => {
	return (
		<button className={styles.btn} {...attributes}>
			{buttonText}
		</button>
	);
};

export default Button;
