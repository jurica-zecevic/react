import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL, passwordPattern } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Registration.module.css';

const Registration = () => {
	const url = `${BASE_URL}/register`;

	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [nameValid, isNameValid] = useState(true);
	const [emailValid, isEmailValid] = useState(true);
	const [passwordValid, isPasswordValid] = useState(true);
	const [hasResponseError, setResponseError] = useState(false);
	const [responseErrorText, setResponseErrorText] = useState('');

	const navigateLogin = useNavigate();

	const handleNameChange = (value) => {
		setNameValue(value);
		isNameValid(value !== '');
	};

	const handleEmailChange = (value) => {
		setEmailValue(value);
		isEmailValid(value !== '');
	};

	const checkPassword = (value) => {
		setPasswordValue(value);
		isPasswordValid(passwordPattern.test(value));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (nameValue === '' || emailValue === '' || !passwordValid) {
			isNameValid(nameValue !== '');
			isEmailValid(emailValue !== '');
		}

		const newUser = {
			name: nameValue,
			email: emailValue,
			password: passwordValue,
		};

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				setResponseError(true);
				setResponseErrorText(response.statusText);
			} else {
				navigateLogin('/login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.registrationFormWrapper}>
			<h1>Registration</h1>
			<form onSubmit={handleSubmit} className={styles.registrationForm}>
				<label className={styles.formLabel} htmlFor='reg-form-name'>
					Name
					<Input
						id='reg-form-name'
						style={{ borderColor: !nameValid && 'var(--color-red)' }}
						type='text'
						placeholder='Enter name...'
						value={nameValue}
						required
						onChange={({ target }) => handleNameChange(target.value)}
					/>
					{!nameValid && <p className={styles.invalid}>Name is required.</p>}
				</label>
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
						placeholder='Only letters and 6 chars min...'
						value={passwordValue}
						required
						onChange={({ target }) => checkPassword(target.value)}
					/>
					{!passwordValid && (
						<p className={styles.invalid}>Password is required.</p>
					)}
				</label>
				<Button type='submit' buttonText='Register' />
				<p>
					If you have an account you may <Link to='/login'>Login</Link>
				</p>
				{hasResponseError && (
					<p className={styles.invalid}>
						Sorry, Registration failed! Reason: {responseErrorText}
					</p>
				)}
			</form>
		</div>
	);
};

export default Registration;
