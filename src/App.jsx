import React from 'react';

import Container from './common/Container/Container';

import { mockedCoursesList, mockedAuthorsList } from './constants';

import './App.css';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import EmptyCourseList from './components/Courses/components/EmptyCourseList/EmptyCourseList';

function App() {
	return (
		<>
			<Header />
			<main>
				<Container>
					{mockedCoursesList.length ? (
						<Courses
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
						/>
					) : (
						<EmptyCourseList />
					)}
				</Container>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
