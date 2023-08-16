import logo from '../../../../assets/logo.png';

import styles from './Logo.module.css';

const Logo = () => {
	return (
		<a href='/'>
			<img className={styles.logo} src={logo} alt='Courses logo' />
		</a>
	);
};

export default Logo;
