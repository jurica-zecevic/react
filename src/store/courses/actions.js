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
export const setCourses = (payload) => ({
	type: actions.SET_COURSES,
	payload,
});
