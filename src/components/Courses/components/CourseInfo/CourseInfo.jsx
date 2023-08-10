import React from 'react';

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
		<div className={styles.wrapper}>
			<h1>{title}</h1>
			<div className={styles.course}>
				<div className={styles.left}>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>
				<div className={styles.right}>
					<div className={styles.rightList}>
						<p className={styles.listItem}>
							<span className={styles.itemLeft}>ID: </span>
							<span className={styles.itemRight}>{id}</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemLeft}>Duration: </span>
							<span className={styles.itemRight}>
								<span className={styles.itemRightBold}>
									{formatDuration(duration).boldPart}{' '}
								</span>
								<span>{formatDuration(duration).notBoldPart}</span>
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemLeft}>Created: </span>
							<span className={styles.itemRight}>
								{formatCreationDate(creationDate)}
							</span>
						</p>
						<p className={styles.listItem}>
							<span className={styles.itemLeft}>Authors: </span>
							<span className={styles.itemRight}>
								{getAuthorNames(authors).join(', ')}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className={styles.button}>
				<Button type='button' onClick={handleBackToCoursesClick}>
					Back
				</Button>
			</div>
		</div>
	);
};

export default course;
