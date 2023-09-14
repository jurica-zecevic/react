import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

import CourseCard from '../CourseCard';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
		token: '',
		role: 'admin',
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

describe('CourseCard component', () => {
	test('CourseCard should display title', () => {
		render(
			<Provider store={mockedStore}>
				<Router>
					{mockedState.courses.map((course) => (
						<li key={course.id}>
							<CourseCard {...course} authorsList={mockedState.authors} />
						</li>
					))}
				</Router>
			</Provider>
		);
		expect(screen.getByText('Test Course 1')).toBeInTheDocument();
	});

	test('CourseCard should display description', () => {
		render(
			<Provider store={mockedStore}>
				<Router>
					{mockedState.courses.map((course) => (
						<li key={course.id}>
							<CourseCard {...course} authorsList={mockedState.authors} />
						</li>
					))}
				</Router>
			</Provider>
		);
		expect(screen.getByText('Test Description 1')).toBeInTheDocument();
	});

	test('CourseCard should display duration in the correct format', () => {
		render(
			<Provider store={mockedStore}>
				<Router>
					{mockedState.courses.map((course) => (
						<li key={course.id}>
							<CourseCard {...course} authorsList={mockedState.authors} />
						</li>
					))}
				</Router>
			</Provider>
		);
		expect(screen.getByText('Duration: 01:00 hour')).toBeInTheDocument();
	});

	test('CourseCard should display authors list', () => {
		render(
			<Provider store={mockedStore}>
				<Router>
					{mockedState.courses.map((course) => (
						<li key={course.id}>
							<CourseCard {...course} authorsList={mockedState.authors} />
						</li>
					))}
				</Router>
			</Provider>
		);

		const authorElement = screen.getByText((content) =>
			content.includes('Author 1')
		);
		expect(authorElement).toBeInTheDocument();
	});

	test('CourseCard should display created date in the correct format', () => {
		render(
			<Provider store={mockedStore}>
				<Router>
					{mockedState.courses.map((course) => (
						<li key={course.id}>
							<CourseCard {...course} authorsList={mockedState.authors} />
						</li>
					))}
				</Router>
			</Provider>
		);

		const dateElement = screen.getByText((content) =>
			content.includes('9.3.2021')
		);
		expect(dateElement).toBeInTheDocument();
	});
});
