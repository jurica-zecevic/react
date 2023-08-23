import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import PropTypes from 'prop-types';

import SearchBar from './components/SearchBar/SearchBar';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

import styles from './Courses.module.css';

const Courses = ({ coursesList, authorsList }) => {
	const [filteredCourses, setDisplayedCourses] = useState(coursesList);

	const navigateAddCourse = useNavigate();

	const userRole = 'admin';

	const handleAddNewCourse = () => {
		navigateAddCourse('/courses/add');
	};

	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			const searchTermLowerCase = searchTerm.toLowerCase();
			const displayedCourses = coursesList.filter((course) => {
				const titleMatch = course.title
					.toLowerCase()
					.includes(searchTermLowerCase);
				const idMatch = course.id.toLowerCase().includes(searchTermLowerCase);

				return titleMatch || idMatch;
			});

			setDisplayedCourses(displayedCourses);
		} else {
			setDisplayedCourses(coursesList);
		}
	};

	return (
		<>
			{coursesList.length ? (
				<section>
					<div className={styles.coursesHeader}>
						<SearchBar onSearch={handleSearch} />
						<div className={styles.buttonContainer}>
							<Button
								type='button'
								buttonText='Add new course'
								onClick={handleAddNewCourse}
							/>
						</div>
					</div>
					<ul className={styles.coursesList}>
						{filteredCourses.map((course) => (
							<li key={course.id}>
								<CourseCard {...course} authorsList={authorsList} />
							</li>
						))}
					</ul>
				</section>
			) : (
				<EmptyCourseList userRole={userRole} />
			)}
		</>
	);
};

Courses.propTypes = {
	coursesList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			creationDate: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default Courses;
