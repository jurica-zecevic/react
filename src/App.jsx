import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './App.css';

import { mockedCoursesList, mockedAuthorsList } from './constants';

import Header from './components/Header/Header';
import Container from './common/Container/Container';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

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
		</>
	);
};

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route
					path='courses'
					element={
						<Courses
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
						/>
					}
				/>
				<Route
					path='courses/:courseId'
					element={
						<CourseInfo
							coursesList={mockedCoursesList}
							authorsList={mockedAuthorsList}
						/>
					}
				/>
				<Route path='register' element={<Registration />} />
				<Route path='login' element={<Login />} />
				{token && <Route path='/' element={<Navigate to='/courses' />} />}
			</Route>
		</Routes>
	);
};

export default App;
