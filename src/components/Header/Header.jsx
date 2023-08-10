import React from 'react';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const isAuthorized = true;

	return (
		<nav className={styles.header}>
			<Logo />
			<span>{isAuthorized ? 'Jurica Zečević' : ''}</span>
			<Button>{isAuthorized ? 'Logout' : 'Login'}</Button>
		</nav>
	);
};

export default Header;
