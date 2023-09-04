import { BASE_URL } from '../../constants';

import {
	addCourseAction,
	updateCourseAction,
	deleteCourseAction,
} from './actions';

export const addCourse = (course) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}/courses/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(course),
			});
			const newCourse = await response.json();

			if (response.ok) {
				dispatch(addCourseAction(newCourse.result));
			}
		} catch (err) {
			console.error('Error while adding course:', err);
			throw err;
		}
	};
};

export const updateCourse = (course, id) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}/courses/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(course),
			});
			const updatedCourse = await response.json();

			if (response.ok) {
				dispatch(updateCourseAction(updatedCourse.result));
			}
		} catch (err) {
			console.error('Error while updating course:', err);
			throw err;
		}
	};
};

export const deleteCourse = (id) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetch(`${BASE_URL}/courses/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			});

			if (response.ok) {
				dispatch(deleteCourseAction(id));
			}
		} catch (err) {
			console.error('Error deleting course:', err);
			throw err;
		}
	};
};
