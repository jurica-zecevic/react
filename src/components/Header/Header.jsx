import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/user/actions';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const userName = localStorage.getItem('userName');

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsUserAuthenticated(!!token);
	}, [location]);

	const handleLogout = () => {
		dispatch(logoutUser());
		setIsUserAuthenticated(false);
		navigate('/login');
	};

	const handleLogin = () => {
		setIsUserAuthenticated(true);
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
				<>
					{isUserAuthenticated ? (
						<Button type='button' buttonText='Logout' onClick={handleLogout} />
					) : (
						<Button type='button' buttonText='Login' onClick={handleLogin} />
					)}
				</>
			)}
		</header>
	);
};

export default Header;
