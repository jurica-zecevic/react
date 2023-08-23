import { SAVE_COURSES, DELETE_COURSE, ADD_COURSE } from './types.js';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case SAVE_COURSES:
			return action.payload;

		case ADD_COURSE:
			return [...state, action.payload];

		case DELETE_COURSE:
			return [...state, action.payload];

		default:
			return state;
	}
};
