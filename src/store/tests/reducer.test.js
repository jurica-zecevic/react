import { coursesReducer, coursesInitialState } from '../courses/reducer';
import * as actions from '../courses/types';

test('should return the initial state', () => {
	expect(coursesReducer(undefined, {})).toEqual(coursesInitialState);
});

test('should handle SAVE_COURSES and return new state', () => {
	const previousState = [];
	const testCourses = [
		{
			id: '66cc289e-6de9-49b2-9ca7-8b4f409d6465',
			title: 'Course 1',
			description: 'description',
			creationDate: '9/3/2021',
			duration: 30,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		},
		{
			id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
			title: 'Course 2',
			description: 'description',
			creationDate: '9/3/2021',
			duration: 30,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		},
	];

	expect(
		coursesReducer(previousState, {
			type: actions.SAVE_COURSES,
			payload: testCourses,
		})
	).toEqual(testCourses);
});
