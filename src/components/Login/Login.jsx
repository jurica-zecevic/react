import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login = () => {
	const url = `${BASE_URL}/login`;
	const navigateCourses = useNavigate();

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [formValid, setFormValid] = useState({
		emailValid: true,
		passwordValid: true,
	});
	const [hasResponseError, setResponseError] = useState(false);
	const [responseErrorText, setResponseErrorText] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const isFormValid = () => {
		const emailValid = formValues.email !== '';
		const passwordValid = formValues.password !== '';

		setFormValid({ emailValid, passwordValid });

		return emailValid && passwordValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!isFormValid()) {
			return;
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(formValues),
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
						name='email'
						style={{ borderColor: !formValid.emailValid && 'var(--color-red)' }}
						type='text'
						placeholder='Enter email address...'
						value={formValues.email}
						required
						onChange={handleInputChange}
					/>
					{!formValid.emailValid && (
						<p className={styles.invalid}>Email is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-password'>
					Password
					<Input
						id='reg-form-password'
						name='password'
						style={{
							borderColor: !formValid.passwordValid && 'var(--color-red)',
						}}
						type='password'
						placeholder='Enter password...'
						value={formValues.password}
						required
						onChange={handleInputChange}
					/>
					{!formValid.passwordValid && (
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
