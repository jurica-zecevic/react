import { useState } from 'react';

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

	const renderContent = () => {
		if (selectedCourse) {
			return (
				<CourseInfo
					{...selectedCourse}
					authorsList={mockedAuthorsList}
					onBackToCourses={handleCourseInfo}
				/>
			);
		} else if (mockedCoursesList.length) {
			return (
				<Courses
					coursesList={mockedCoursesList}
					authorsList={mockedAuthorsList}
					onSelectCourse={handleCourseInfo}
				/>
			);
		} else {
			return <EmptyCourseList />;
		}
	};

	return (
		<>
			<Header />
			<main>
				<Container>{renderContent()}</Container>
			</main>
		</>
	);
}

export default App;
