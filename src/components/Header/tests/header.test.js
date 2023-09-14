import { BrowserRouter as Router } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import Header from '../Header';

describe('Header component', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: jest.fn(() => 'mocked-token'),
				setItem: jest.fn(),
				removeItem: jest.fn(),
			},
			writable: true,
		});
	});

	it('should have a logo and user name', () => {
		const mockedState = {
			user: {
				isAuth: true,
				name: 'Test Name',
				email: '',
				token: '',
				role: 'admin',
			},
			courses: [],
			authors: [],
		};

		const mockedStore = {
			getState: () => mockedState,
			subscribe: jest.fn(),
			dispatch: jest.fn(),
		};

		render(
			<Provider store={mockedStore}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		const logo = screen.getByAltText('Courses logo');
		const userName = screen.getByText('Test Name');

		expect(logo).toBeInTheDocument();
		expect(userName).toBeInTheDocument();
	});
});
