import * as actions from './types.js';

export const saveAuthor = (payload) => ({
	type: actions.SAVE_AUTHORS,
	payload,
});
export const fetchAuthorsAction = (authors) => ({
	type: actions.FETCH_AUTHORS,
	payload: authors,
});
