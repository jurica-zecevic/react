import * as actions from './types.js';

export const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.UPDATE_COURSE:
			return [...state, action.payload];
		case actions.ADD_COURSE:
			return [...state, action.payload];
		case actions.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);

		case actions.FETCH_COURSES: {
			return action.payload;
		}
		default:
			return state;
	}
};
