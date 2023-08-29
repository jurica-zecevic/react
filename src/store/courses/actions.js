import * as actions from './types.js';

export const addCourse = (payload) => ({
	type: actions.ADD_COURSE,
	payload,
});
export const deleteCourse = (id) => ({
	type: actions.DELETE_COURSE,
	payload: id,
});
export const updateCourse = (payload) => ({
	type: actions.SAVE_COURSES,
	payload,
});
export const fetchCoursesAction = (courses) => ({
	type: actions.FETCH_COURSES,
	payload: courses,
});
