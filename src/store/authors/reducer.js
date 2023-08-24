import { FETCH_AUTHORS } from './types.js';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case FETCH_AUTHORS:
			return [...state, action.payload];

		default:
			return state;
	}
};
