import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const isAuthorized = true;

	return (
		<header className={styles.header}>
			<Logo />
			{isAuthorized && <span>Jurica Zečević</span>}
			<Button type='button' buttonText={isAuthorized ? 'Logout' : 'Login'} />
		</header>
	);
};

export default Header;
