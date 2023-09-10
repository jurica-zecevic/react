import * as actions from './types.js';

export const addCourseAction = (courses) => ({
	type: actions.ADD_COURSE,
	payload: courses,
});
export const updateCourseAction = (courses) => ({
	type: actions.UPDATE_COURSE,
	payload: courses,
});
export const deleteCourseAction = (id) => ({
	type: actions.DELETE_COURSE,
	payload: id,
});
export const fetchCoursesAction = (courses) => ({
	type: actions.FETCH_COURSES,
	payload: courses,
});
