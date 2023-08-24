import { BASE_URL } from './constants';

export const fetchCourses = async () => {
	try {
		const response = await fetch(`${BASE_URL}/courses/all`);
		const courses = await response.json();

		if (!response.ok) {
			throw new Error(courses.message || 'Something went wrong');
		} else {
			console.log(courses.result);
			return courses.result;
		}
	} catch (error) {
		console.error('Error fetching courses:', error);
		throw error;
	}
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
