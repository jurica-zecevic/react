import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './CourseInfo.module.css';

import Link from '../../common/Link/Link';

import { formatCourseDuration } from '../../helpers/formatCourseDuration';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getAuthorNames } from '../../helpers/getAuthorNames';

const CourseInfo = ({ coursesList, authorsList }) => {
	let { courseId } = useParams();
	const [course, setCourse] = useState(null);

	useEffect(() => {
		const clickedCourse = coursesList.find((course) => course.id === courseId);
		setCourse(clickedCourse);
	}, [courseId, coursesList]);

	if (!course) {
		return <div>No courses found...</div>;
	}

	return (
		<div className={styles.course}>
			<h1>{course.title}</h1>
			<div className={styles.courseCard}>
				<div className={styles.courseHeader}>
					<h2>Description:</h2>
					<p>{course.description}</p>
				</div>
				<div className={styles.courseDetails}>
					<div className={styles.courseList}>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>ID: </span>
							<span className={styles.itemDescription}>{course.id}</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Duration: </span>
							<span className={styles.itemDescription}>
								<span>
									{formatCourseDuration(course.duration).durationTime}{' '}
								</span>
								<span>
									{formatCourseDuration(course.duration).durationLabel}
								</span>
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Created: </span>
							<span className={styles.itemDescription}>
								{formatCreationDate(course.creationDate)}
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Authors: </span>
							<span className={styles.itemDescription}>
								{getAuthorNames(course.authors, authorsList).join(', ')}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.linkContainer}>
				<Link to='/courses' linkText='Back' />
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
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

export default CourseInfo;
