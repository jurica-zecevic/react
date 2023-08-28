import { BASE_URL } from './constants';

import { fetchCoursesAction } from './store/courses/actions';
import { fetchAuthorsAction } from './store/authors/actions';

export const fetchCourses = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${BASE_URL}/courses/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const courses = await response.json();

			if (response.ok) {
				dispatch(fetchCoursesAction(courses.result));
			} else {
				throw new Error(courses.message || 'Something went wrong');
			}
		} catch (err) {
			console.error('Error fetching courses:', err);
			throw err;
		}
	};
};

export const fetchAuthors = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${BASE_URL}/authors/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const authors = await response.json();

			if (response.ok) {
				dispatch(fetchAuthorsAction(authors.result));
			} else {
				throw new Error(authors.message || 'Something went wrong');
			}
		} catch (err) {
			console.error('Error fetching courses:', err);
			throw err;
		}
	};
};
