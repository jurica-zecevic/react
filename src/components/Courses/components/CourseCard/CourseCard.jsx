import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import styles from './CourseCard.module.css';

import { getUserRole } from '../../../../selectors';

import { deleteCourse } from '../../../../store/courses/thunk';

import Button from '../../../../common/Button/Button';
import IconButton from '../../../../common/IconButton/IconButton';

import {
	deleteCourseIcon,
	editCourseIcon,
} from '../../../../common/style/icons';

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
	const navigateCourseDetails = useNavigate();
	const dispatch = useDispatch();

	const role = useSelector(getUserRole);

	const showCourseDetails = () => {
		navigateCourseDetails(`/courses/${id}`);
	};

	const handleUpdateCourse = () => {
		navigateCourseDetails(`/courses/update/${id}`);
	};

	const handleDeleteCourse = () => {
		dispatch(deleteCourse(id));
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
				<div className={styles.cardButtonsContainer}>
					<Button
						buttonText='Show course'
						type='button'
						onClick={showCourseDetails}
					/>
					{role === 'admin' && (
						<>
							<IconButton
								hasBackground
								icon={deleteCourseIcon}
								onClick={handleDeleteCourse}
							/>
							<IconButton
								hasBackground
								icon={editCourseIcon}
								onClick={handleUpdateCourse}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.arrayOf(PropTypes.string),
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	authorsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default CourseCard;
