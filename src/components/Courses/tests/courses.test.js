import { render, screen, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

import Courses from '../Courses';
import CreateCourse from '../../CreateCourse/CreateCourse';

describe('Courses component', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
			email: '',
			token: '',
		},
		courses: [
			{
				id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
				title: 'Test Course 1',
				description: 'Test Description 1',
				creationDate: '9/3/2021',
				duration: 60,
				authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
			},
			{
				id: '6cc289e-6de9-49b2-9ca7-8b4f409d6468',
				title: 'Test Course 2',
				description: 'Test Description 2',
				creationDate: '9/3/2022',
				duration: 120,
				authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d37'],
			},
		],
		authors: [
			{ id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36', name: 'Author 1' },
			{ id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d37', name: 'Author 2' },
		],
	};

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<Router>
					<Courses
						coursesList={mockedState.courses}
						authorsList={mockedState.authors}
					/>
					<CreateCourse />
				</Router>
			</Provider>
		);
	});

	it('should display amount of CourseCard equal length of courses array', () => {
		const courseCard = screen.getAllByTestId('course-card');

		expect(courseCard.length).toBe(mockedState.courses.length);
	});

	it('should show CourseForm after click on "Add new course" button', () => {
		const addButton = screen.getByText('Add new course');

		fireEvent.click(addButton);

		const courseForm = screen.getByTestId('course-form');
		expect(courseForm).toBeInTheDocument();
	});
});
