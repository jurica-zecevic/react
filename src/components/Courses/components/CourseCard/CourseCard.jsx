import { useNavigate } from 'react-router-dom';

import styles from './CourseCard.module.css';

import Button from '../../../../common/Button/Button';

import { getAuthorNames } from '../../../../helpers/getAuthorNames';
import { formatCourseDuration } from '../../../../helpers/formatCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

const CourseCard = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
	authorsList,
}) => {
	const navigate = useNavigate();

	const showCourseDetails = () => {
		navigate(`/courses/${id}`);
	};

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className={styles.cardDetails}>
				<div className={styles.cardList}>
					<p>
						<span>
							Authors: {getAuthorNames(authors, authorsList).join(', ')}
						</span>
					</p>
					<p>
						<span>
							Duration: {formatCourseDuration(duration).durationTime}{' '}
							{formatCourseDuration(duration).durationLabel}
						</span>
					</p>
					<p>
						<span>Created: {formatCreationDate(creationDate)}</span>
					</p>
				</div>
				<Button
					buttonText='Show course'
					type='button'
					onClick={showCourseDetails}
				/>
			</div>
		</div>
	);
};

export default CourseCard;
