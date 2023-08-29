import * as actions from './types.js';

export const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.SAVE_AUTHOR:
			return [...state, action.payload];
		case actions.FETCH_AUTHORS: {
			return action.payload;
		}
		default:
			return state;
	}
};
