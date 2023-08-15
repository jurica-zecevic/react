import styles from './CourseInfo.module.css';

import Button from '../../../../common/Button/Button';

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
	const formatCreationDate = (creationDate) => {
		const date = creationDate.split('/');
		const dateRes = date.join('.');
		return dateRes;
	};

	const formatDuration = (durationInMinutes) => {
		const hours = Math.floor(durationInMinutes / 60);
		const minutes = durationInMinutes % 60;
		const formattedHours = hours < 10 ? '0' + hours : hours;
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
		const hourString = hours === 1 ? 'hour' : 'hours';
		return {
			boldPart: `${formattedHours}:${formattedMinutes}`,
			notBoldPart: hourString,
		};
	};

	const getAuthorNames = (courseAuthors) => {
		return courseAuthors.map((authorId) => {
			const author = authorsList.find((author) => author.id === authorId);
			return author ? author.name : 'Unknown Author';
		});
	};

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
								<span>{formatDuration(duration).boldPart} </span>
								<span>{formatDuration(duration).notBoldPart}</span>
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
								{getAuthorNames(authors).join(', ')}
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
