import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login = () => {
	const url = `${BASE_URL}/login`;

	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [emailValid, isEmailValid] = useState(true);
	const [passwordValid, isPasswordValid] = useState(true);
	const [hasResponseError, setResponseError] = useState(false);
	const [responseErrorText, setResponseErrorText] = useState('');

	const navigateCourses = useNavigate();

	const handleEmailChange = (value) => {
		setEmailValue(value);
		isEmailValid(value !== '');
	};

	const checkPassword = (value) => {
		setPasswordValue(value);
		isPasswordValid(value !== '');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (emailValue === '' || passwordValue === '') {
			isEmailValid(emailValue !== '');
			isPasswordValid(passwordValid !== '');
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

			if (!response.ok) {
				setResponseError(true);
				setResponseErrorText(response.statusText);
			} else {
				const data = await response.json();
				localStorage.setItem('token', data.result);
				localStorage.setItem('userName', data.user.name);
				navigateCourses('/courses');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.loginFormWrapper}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<label className={styles.formLabel} htmlFor='reg-form-email'>
					Email
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
					Password
					<Input
						id='reg-form-password'
						style={{ borderColor: !passwordValid && 'var(--color-red)' }}
						type='password'
						placeholder='Enter password...'
						value={passwordValue}
						required
						onChange={({ target }) => checkPassword(target.value)}
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
				{hasResponseError && (
					<p className={styles.invalid}>
						Sorry, Login failed! Reason: {responseErrorText}
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;
