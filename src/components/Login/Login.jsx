import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login = () => {
	const url = 'http://localhost:4000/login';

	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [emailValid, setEmailValid] = useState(true);
	const [passwordValid, setPasswordValid] = useState(true);
	const [hasError, setError] = useState(false);

	const navigate = useNavigate();

	const handleEmailChange = (value) => {
		setEmailValue(value);
		setEmailValid(value !== '');
	};

	const handlePasswordChange = (value) => {
		setPasswordValue(value);
		setPasswordValid(value !== '');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (emailValue === '' || passwordValid === '') {
			setEmailValid(emailValue !== '');
			return;
		}

		const currentUser = {
			email: emailValue,
			password: passwordValue,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(currentUser),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('token', data.result);
				navigate('/courses');
			}
		} catch (error) {
			setError(true);
		}
	};

	return (
		<div className={styles.loginFormWrapper}>
			<h1>Login</h1>
			{hasError && <p>Sorry, Sign up failed!</p>}
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<label className={styles.formLabel} htmlFor='reg-form-email'>
					Email:
					<Input
						id='reg-form-email'
						style={{ borderColor: !emailValid && 'var(--color-red)' }}
						type='text'
						placeholder='Enter email address...'
						value={emailValue}
						required
						onChange={({ target }) => handleEmailChange(target.value)}
					/>
					{!emailValid && <p className={styles.invalid}>Email is required.</p>}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-password'>
					Password:
					<Input
						id='reg-form-password'
						style={{ borderColor: !passwordValid && 'var(--color-red)' }}
						type='current-password'
						placeholder='Enter password...'
						value={passwordValue}
						required
						onChange={({ target }) => handlePasswordChange(target.value)}
					/>
					{!passwordValid && (
						<p className={styles.invalid}>Password is required.</p>
					)}
				</label>
				<Button type='submit' buttonText='Login' />
				<p>
					If you don't have an account you may{' '}
					<Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
