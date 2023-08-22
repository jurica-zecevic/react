import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const [isUserAuthenticated, setUserAuthenticated] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const userName = localStorage.getItem('userName');

	useEffect(() => {
		const token = localStorage.getItem('token');
		setUserAuthenticated(!!token);
	}, [location]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
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
			{isUserAuthenticated && shouldShowAuthElements && <span>{userName}</span>}
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
