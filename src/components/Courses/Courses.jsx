import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';
/* import Button from '../../common/Button/Button'; */

import styles from './Courses.module.css';

const Courses = ({ coursesList, authorsList, onSelectCourse }) => {
	return (
		<section>
			{/* <SearchBar /> */}
			<ul className={styles.coursesList}>
				{coursesList.map((course) => (
					<li key={course.id}>
						<CourseCard
							{...course}
							authorsList={authorsList}
							onSelect={() => onSelectCourse(course)}
						/>
					</li>
				))}
			</ul>
			{/* <Button>Add new course</Button> */}
		</section>
	);
};

export default Courses;
