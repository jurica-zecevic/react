import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL, passwordPattern } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Registration.module.css';

const Registration = () => {
	const url = `${BASE_URL}/register`;
	const navigateLogin = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [formValidation, setFormValidation] = useState({
		nameValid: true,
		emailValid: true,
		passwordValid: true,
	});

	const [hasResponseError, setResponseError] = useState(false);
	const [responseErrorText, setResponseErrorText] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const isFormValid = () => {
		const nameValid = formData.name !== '';
		const emailValid = formData.email !== '';
		const passwordValid = passwordPattern.test(formData.password);

		setFormValidation({ nameValid, emailValid, passwordValid });

		return nameValid && emailValid && passwordValid;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!isFormValid()) {
			return;
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(formData),
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
						name='name'
						style={{
							borderColor: !formValidation.nameValid && 'var(--color-red)',
						}}
						type='text'
						placeholder='Enter name...'
						value={formData.name}
						onChange={handleInputChange}
					/>
					{!formValidation.nameValid && (
						<p className={styles.invalid}>Name is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-email'>
					Email
					<Input
						id='reg-form-email'
						name='email'
						style={{
							borderColor: !formValidation.emailValid && 'var(--color-red)',
						}}
						type='text'
						placeholder='Enter email address...'
						value={formData.email}
						onChange={handleInputChange}
					/>
					{!formValidation.emailValid && (
						<p className={styles.invalid}>Email is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-password'>
					Password
					<Input
						id='reg-form-password'
						name='password'
						style={{
							borderColor: !formValidation.passwordValid && 'var(--color-red)',
						}}
						type='password'
						placeholder='Only letters and 6 chars min...'
						value={formData.password}
						onChange={handleInputChange}
					/>
					{!formValidation.passwordValid && (
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
