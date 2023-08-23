import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL, passwordPattern } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Registration.module.css';

const Registration = () => {
	const url = `${BASE_URL}/register`;
	const navigateLogin = useNavigate();

	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [formValid, setFormValid] = useState({
		isNameValid: true,
		isEmailValid: true,
		isPasswordValid: true,
	});
	const [error, setError] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const isFormValid = () => {
		const isNameValid = formValues.name !== '';
		const isEmailValid = formValues.email !== '';
		const isPasswordValid = passwordPattern.test(formValues.password);

		setFormValid({ isNameValid, isEmailValid, isPasswordValid });

		return isNameValid && isEmailValid && isPasswordValid;
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
				const text = await response.json();
				setError(text.errors);
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
							borderColor: !formValid.isNameValid && 'var(--color-red)',
						}}
						type='text'
						placeholder='Enter name...'
						value={formValues.name}
						onChange={handleInputChange}
					/>
					{!formValid.isNameValid && (
						<p className={styles.invalid}>Name is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-email'>
					Email
					<Input
						id='reg-form-email'
						name='email'
						style={{
							borderColor: !formValid.isEmailValid && 'var(--color-red)',
						}}
						type='text'
						placeholder='Enter email address...'
						value={formValues.email}
						onChange={handleInputChange}
					/>
					{!formValid.isEmailValid && (
						<p className={styles.invalid}>Email is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='reg-form-password'>
					Password
					<Input
						id='reg-form-password'
						name='password'
						style={{
							borderColor: !formValid.isPasswordValid && 'var(--color-red)',
						}}
						type='password'
						placeholder='Only letters and 6 chars min...'
						value={formValues.password}
						onChange={handleInputChange}
					/>
					{!formValid.isPasswordValid && (
						<p className={styles.invalid}>Password is required.</p>
					)}
				</label>
				<Button type='submit' buttonText='Register' />
				<p>
					If you have an account you may <Link to='/login'>Login</Link>
				</p>
				{error && (
					<p className={styles.invalid}>
						Sorry, Registration failed! Reason:
						<br />
						{error}
					</p>
				)}
			</form>
		</div>
	);
};

export default Registration;
