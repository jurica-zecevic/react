import { useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

import styles from './Courses.module.css';

const Courses = ({ coursesList, authorsList, onSelectCourse }) => {
	const [filteredCourses, setFilteredCourses] = useState(coursesList);

	const handleSearch = (searchTerm) => {
		if (searchTerm) {
			const searchTermLowerCase = searchTerm.toLowerCase();
			const filtered = coursesList.filter((course) => {
				const titleMatch = course.title
					.toLowerCase()
					.includes(searchTermLowerCase);
				const idMatch = course.id.toLowerCase().includes(searchTermLowerCase);

				return titleMatch || idMatch;
			});

			setFilteredCourses(filtered);
		} else {
			setFilteredCourses(coursesList);
		}
	};

	return (
		<section>
			<div className={styles.coursesHeader}>
				{<SearchBar onSearch={handleSearch} />}
				<Button type='button' buttonText='Add new course' />
			</div>
			<ul className={styles.coursesList}>
				{filteredCourses.map((course) => (
					<li key={course.id}>
						<CourseCard
							{...course}
							authorsList={authorsList}
							onSelect={() => onSelectCourse(course)}
						/>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Courses;
