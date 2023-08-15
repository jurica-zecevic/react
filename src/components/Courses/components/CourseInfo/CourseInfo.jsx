import styles from './CourseInfo.module.css';

import Button from '../../../../common/Button/Button';

import { formatCourseDuration } from '../../../../helpers/formatCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getAuthorNames } from '../../../../helpers/getAuthorNames';

const course = ({
	id,
	title,
	description,
	duration,
	authors,
	creationDate,
	authorsList,
	onBackToCourses,
}) => {
	const handleBackToCoursesClick = () => {
		onBackToCourses();
	};

	return (
		<div className={styles.courseWrapper}>
			<h1>{title}</h1>
			<div className={styles.course}>
				<div className={styles.courseHeader}>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>
				<div className={styles.courseDetails}>
					<div className={styles.courseList}>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>ID: </span>
							<span className={styles.itemDescription}>{id}</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Duration: </span>
							<span className={styles.itemDescription}>
								<span>{formatCourseDuration(duration).hoursMins} </span>
								<span>{formatCourseDuration(duration).hourString}</span>
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Created: </span>
							<span className={styles.itemDescription}>
								{formatCreationDate(creationDate)}
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemHeader}>Authors: </span>
							<span className={styles.itemDescription}>
								{getAuthorNames(authors, authorsList).join(', ')}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<Button
					type='button'
					onClick={handleBackToCoursesClick}
					buttonText='Back'
				/>
			</div>
		</div>
	);
};

export default course;
