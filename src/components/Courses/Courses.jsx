import React from 'react';

import CourseCard from './components/CourseCard/CourseCard';
/* import Button from '../../common/Button/Button'; */

import styles from './Courses.module.css';

const Courses = (props) => {
	const coursesList = props.coursesList;
	const authorsList = props.authorsList;

	return (
		<section>
			{/* <SearchBar /> */}
			<ul className={styles.coursesList}>
				{coursesList.map((course) => (
					<li key={course.id}>
						<CourseCard
							title={course.title}
							description={course.description}
							authors={course.authors}
							duration={course.duration}
							creationDate={course.creationDate}
							authorsList={authorsList}
						/>
					</li>
				))}
			</ul>
			{/* <Button>Add new course</Button> */}
		</section>
	);
};

export default Courses;
