import styles from './CourseCard.module.css';

import Button from '../../../../common/Button/Button';

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	authorsList,
	onSelect,
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
		return `${formattedHours}:${formattedMinutes} ${hourString}`;
	};

	function getAuthorNames(course) {
		return course.map((authorId) => {
			const author = authorsList.find((author) => author.id === authorId);
			return author ? author.name : 'Unknown Author';
		});
	}

	const handleDetailsClick = () => {
		onSelect(id);
	};

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className={styles.right}>
				<div className={styles.rightList}>
					<p className={styles.cardAuthors}>
						<span>Authors: {getAuthorNames(authors).join(', ')}</span>
					</p>
					<p>
						<span>Duration: {formatDuration(duration)}</span>
					</p>
					<p>
						<span>Created: {formatCreationDate(creationDate)}</span>
					</p>
				</div>
				<Button
					buttonText='Show course'
					type='button'
					onClick={handleDetailsClick}
				/>
			</div>
		</div>
	);
};

export default CourseCard;
