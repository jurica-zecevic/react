import { SAVE_COURSES, DELETE_COURSE, ADD_COURSE } from './types.js';

const addCourseAction = (payload) => ({ type: ADD_COURSE, payload });
const deleteCourseAction = (payload) => ({ type: DELETE_COURSE, payload });
const saveCoursesAction = (payload) => ({ type: SAVE_COURSES, payload });
