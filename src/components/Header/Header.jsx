import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const [isUserAuthenticated, setUserAuthenticated] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem('token');
		setUserAuthenticated(!!token);
	}, [location]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setUserAuthenticated(false);
		navigate('/login');
	};

	const handleLogin = () => {
		setUserAuthenticated(true);
		navigate('/courses');
	};

	const shouldShowAuthElements = !['/login', '/register'].includes(
		location.pathname
	);

	return (
		<header className={styles.header}>
			<Logo />
			{isUserAuthenticated && shouldShowAuthElements && (
				<span>Jurica Zečević</span>
			)}
			{shouldShowAuthElements && (
				<Button
					type='button'
					buttonText={isUserAuthenticated ? 'Logout' : 'Login'}
					onClick={isUserAuthenticated ? handleLogout : handleLogin}
				/>
			)}
		</header>
	);
};

export default Header;
