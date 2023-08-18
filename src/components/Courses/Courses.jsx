import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

import styles from './Courses.module.css';

const Courses = ({ coursesList, authorsList }) => {
	const [filteredCourses, setDisplayedCourses] = useState(coursesList);

	const navigate = useNavigate();

	const handleAddNewCourse = () => {
		navigate('/courses/add');
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
		</>
	);
};

export default Courses;
