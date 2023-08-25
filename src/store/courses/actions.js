import * as actions from './types.js';

export const addCourseAction = (payload) => ({
	type: actions.ADD_COURSE,
	payload,
});
export const deleteCourseAction = (payload) => ({
	type: actions.DELETE_COURSE,
	payload,
});
export const saveCoursesAction = (payload) => ({
	type: actions.SAVE_COURSES,
	payload,
});
export const fetchCoursesAction = (courses) => ({
	type: actions.FETCH_COURSES,
	payload: courses,
});
