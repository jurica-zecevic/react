import { getAllAuthors } from '../../services';

import { FETCH_AUTHORS } from './types.js';

export const fetchAuthors = () => async (dispatch) => {
	try {
		const authors = await getAllAuthors();
		dispatch({ type: FETCH_AUTHORS, payload: authors });
	} catch (error) {
		console.error(error);
	}
};
