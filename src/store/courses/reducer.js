import * as actions from './types.js';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.SAVE_COURSES:
			return action.payload;

		case actions.ADD_COURSE:
			return [...state, action.payload];

		case actions.DELETE_COURSE:
			return [...state, action.payload];

		case actions.FETCH_COURSES_SUCCEEDED: {
			return action.payload;
		}

		default:
			return state;
	}
};
