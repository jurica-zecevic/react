import { BASE_URL } from '../../constants';

import { saveAuthorAction } from './actions';

export const saveAuthor = (author) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}/authors/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(author),
			});
			const newAuthor = await response.json();

			if (response.ok) {
				dispatch(saveAuthorAction(newAuthor.result));
				return newAuthor.result;
			}
		} catch (err) {
			console.error('Error while saving author:', err);
			throw err;
		}
	};
};
