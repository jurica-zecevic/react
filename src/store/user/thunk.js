import { BASE_URL } from '../../constants';

import { setUserAction, logoutUserAction } from './actions';

export const setUser = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const response = await fetch(`${BASE_URL}/users/me`, {
					headers: { Authorization: token },
				});
				const user = await response.json();

				if (response.ok) {
					dispatch(setUserAction(user.result));
				}
			}
		} catch (err) {
			console.error('Failed to fetch user:', err);
			throw err;
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}/logout`, {
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			});

			if (response.ok) {
				dispatch(logoutUserAction());
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};
};
