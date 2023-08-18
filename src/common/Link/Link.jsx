import { Link } from 'react-router-dom';

import styles from './Link.module.css';

const Button = ({ linkText, ...attributes }) => {
	return (
		<Link className={styles.link} {...attributes}>
			{linkText}
		</Link>
	);
};

export default Button;
