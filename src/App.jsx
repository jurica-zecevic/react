import React, { useState } from 'react';

import Container from './common/Container/Container';

import { mockedCoursesList, mockedAuthorsList } from './constants';

import './App.css';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/Courses/components/CourseInfo/CourseInfo';
import EmptyCourseList from './components/Courses/components/EmptyCourseList/EmptyCourseList';

function App() {
	const [selectedCourse, setSelectedCourse] = useState(null);

	const handleCourseInfo = (course) => {
		setSelectedCourse(course);
	};

	return (
		<>
			<Header />
			<main>
				<Container>
					{selectedCourse ? (
						<CourseInfo
							{...selectedCourse}
							authorsList={mockedAuthorsList}
							onBackToCourses={handleCourseInfo}
						/>
					) : mockedCoursesList.length ? (
						<Courses
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
							onSelectCourse={handleCourseInfo}
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
