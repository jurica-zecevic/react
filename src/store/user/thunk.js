import { BASE_URL } from '../../constants';

import { setUser, logoutUser } from './actions';

export const fetchUser = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const response = await fetch(`${BASE_URL}/users/me`, {
					headers: { Authorization: token },
				});
				const user = await response.json();

				if (response.ok) {
					dispatch(setUser(user.result));
				}
			}
		} catch (err) {
			console.error('Failed to fetch user:', err);
			throw err;
		}
	};
};

export const logout = () => {
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
				console.log(response.result);
				dispatch(logoutUser());
			}
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};
};
