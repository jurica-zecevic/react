import { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './App.css';

import { mockedCoursesList, mockedAuthorsList } from './constants';

import Header from './components/Header/Header';
import Container from './common/Container/Container';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

const token = localStorage.getItem('token');

const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</>
	);
};

const App = () => {
	const [courses, setCourses] = useState(mockedCoursesList);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route
					path='courses'
					element={
						<Courses coursesList={courses} authorsList={mockedAuthorsList} />
					}
				/>
				<Route
					path='courses/:courseId'
					element={
						<CourseInfo coursesList={courses} authorsList={mockedAuthorsList} />
					}
				/>
				<Route
					path='courses/add'
					element={<CreateCourse courses={courses} setCourses={setCourses} />}
				/>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login />} />
				<Route path='/' element={<Navigate to='/login' />} />
				{token && <Route path='/' element={<Navigate to='/courses' />} />}
			</Route>
		</Routes>
	);
};

export default App;
