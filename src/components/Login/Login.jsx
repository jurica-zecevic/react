import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { loginUser } from '../../store/user/actions';

import { BASE_URL } from '../../constants';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login = () => {
	const url = `${BASE_URL}/login`;
	const navigateCourses = useNavigate();
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});
	const [formValid, setFormValid] = useState({
		isEmailValid: true,
		isPasswordValid: true,
	});
	const [error, setError] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const isFormValid = () => {
		const isEmailValid = formValues.email !== '';
		const isPasswordValid = formValues.password !== '';

		setFormValid({ isEmailValid, isPasswordValid });

		return isEmailValid && isPasswordValid;
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
				setError(text.result);
			} else {
				const data = await response.json();

				dispatch(
					loginUser({
						name: data.user.name,
						email: data.user.email,
						token: data.result,
					})
				);

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
						placeholder='Enter password...'
						value={formValues.password}
						onChange={handleInputChange}
					/>
					{!formValid.isPasswordValid && (
						<p className={styles.invalid}>Password is required.</p>
					)}
				</label>
				<Button type='submit' buttonText='Login' />
				<p>
					If you don't have an account you may{' '}
					<Link to='/register'>Register</Link>
				</p>
				{error && (
					<p className={styles.invalid}>
						Sorry, Login failed! Reason:
						<br />
						{error}
					</p>
				)}
			</form>
		</div>
	);
};

export default Login;
