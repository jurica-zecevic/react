import React from 'react';

import styles from './Input.module.css';

const Input = ({ ...attributes }) => {
	return <input className={styles.input} {...attributes} />;
};

export default Input;
