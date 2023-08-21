import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthorized(!!token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsAuthorized(false);
		navigate('/login');
	};

	const handleLogin = () => {
		setIsAuthorized(true);
		navigate('/courses');
	};

	const shouldShowAuthElements = !['/login', '/register'].includes(
		location.pathname
	);

	return (
		<header className={styles.header}>
			<Logo />
			{isAuthorized && shouldShowAuthElements && <span>Jurica Zečević</span>}
			{shouldShowAuthElements && (
				<Button
					type='button'
					buttonText={isAuthorized ? 'Logout' : 'Login'}
					onClick={isAuthorized ? handleLogout : handleLogin}
				/>
			)}
		</header>
	);
};

export default Header;
