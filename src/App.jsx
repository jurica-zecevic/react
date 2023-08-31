import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import { fetchCourses, fetchAuthors } from './services';
import { getCourses, getAuthors } from './selectors';

import './App.css';

import Header from './components/Header/Header';
import Container from './common/Container/Container';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

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
	const dispatch = useDispatch();
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	useEffect(() => {
		dispatch(fetchCourses());
		dispatch(fetchAuthors());
	}, [dispatch]);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route
					path='courses'
					element={<Courses coursesList={courses} authorsList={authors} />}
				/>
				<Route
					path='courses/:courseId'
					element={<CourseInfo coursesList={courses} authorsList={authors} />}
				/>
				<Route
					path='courses/add'
					element={
						<PrivateRoute>
							<CourseForm courses={courses} />
						</PrivateRoute>
					}
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
