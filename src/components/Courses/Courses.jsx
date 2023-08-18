import { useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Link from '../../common/Link/Link';

import styles from './Courses.module.css';

const Courses = ({ coursesList, authorsList }) => {
	const [filteredCourses, setDisplayedCourses] = useState(coursesList);

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
			<section>
				<div className={styles.coursesHeader}>
					<SearchBar onSearch={handleSearch} />
					<div className={styles.buttonContainer}>
						<Link to='/courses/add' linkText='Add new course' />
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
		</>
	);
};

export default Courses;
