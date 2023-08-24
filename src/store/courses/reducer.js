import * as actions from './types.js';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.SAVE_COURSES:
			return action.payload;

		case actions.ADD_COURSE:
			return [...state, action.payload];

		case actions.DELETE_COURSE:
			return [...state, action.payload];

		case actions.SET_COURSES:
			return [...state, action.payload];

		default:
			return state;
	}
};
