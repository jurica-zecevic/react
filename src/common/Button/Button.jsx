import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, ...attributes }) => {
	return (
		<button className={styles.btn} type='button' {...attributes}>
			{children}
		</button>
	);
};

export default Button;
