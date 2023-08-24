import axios from 'axios';

import { BASE_URL } from './constants';

import { fetchCoursesSucceeded } from './store/courses/actions';

export const fetchCourses = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${BASE_URL}/courses/all`);
			dispatch(fetchCoursesSucceeded(response.data.result));
		} catch (err) {
			console.error('Error fetching courses:', err);
			throw err;
		}
	};
};

export const fetchAuthors = async () => {
	try {
		const response = await fetch(`${BASE_URL}/authors/all`);
		const authors = await response.json();
		if (!response.ok) {
			throw new Error(authors.message || 'Something went wrong');
		} else {
			console.log(authors.result);
			return response.data;
		}
	} catch (error) {
		console.error('Error fetching authors:', error);
		throw error;
	}
};
