import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { addCourse, updateCourse } from '../../store/courses/thunk';
import { saveAuthor } from '../../store/authors/thunk';

import { formatCourseDuration } from '../../helpers/formatCourseDuration';

import AuthorItem from './components/AuthorItem';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import styles from './CourseForm.module.css';

const CourseForm = ({ coursesList, authorsList }) => {
	const [formValues, setFormValues] = useState({
		title: '',
		description: '',
		duration: '',
		authorName: '',
	});
	const [formValid, setFormValid] = useState({
		isTitleValid: true,
		isDescriptionValid: true,
		isDurationValid: true,
	});
	const [authors, setAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const { action, courseId } = useParams();
	const isUpdate = action === 'update';

	const dispatch = useDispatch();
	const navigateCourses = useNavigate();

	useEffect(() => {
		if (isUpdate) {
			const courseToUpdate = coursesList.find(
				(course) => course.id === courseId
			);
			if (courseToUpdate) {
				setFormValues({
					title: courseToUpdate.title,
					description: courseToUpdate.description,
					duration: courseToUpdate.duration,
				});
				setCourseAuthors(
					courseToUpdate.authors.map((authorId) =>
						authorsList.find((author) => author.id === authorId)
					)
				);
			}
		}
	}, [isUpdate, courseId, coursesList, authorsList]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const isFormValid = () => {
		const isTitleValid = formValues.title !== '';
		const isDescriptionValid = formValues.description !== '';
		const isDurationValid = formValues.duration > 0;

		setFormValid({
			isTitleValid,
			isDescriptionValid,
			isDurationValid,
		});

		return isTitleValid && isDescriptionValid && isDurationValid;
	};

	const handleAddAuthor = (author) => {
		setCourseAuthors([...courseAuthors, author]);
		setAuthors(authors.filter((a) => a.id !== author.id));
	};

	const handleDeleteAuthor = (author) => {
		setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
	};

	const handleCreateAuthor = () => {
		const newAuthor = {
			name: formValues.authorName,
		};
		dispatch(saveAuthor(newAuthor)).then((createdAuthor) => {
			setAuthors([...authors, createdAuthor]);
			setFormValues({ ...formValues, authorName: '' });
		});
	};

	const buildNewCourse = () => {
		return {
			title: formValues.title,
			description: formValues.description,
			duration: parseInt(formValues.duration),
			authors: courseAuthors.map((author) => author.id),
		};
	};

	const buildUpdatedCourse = () => {
		return {
			title: formValues.title,
			description: formValues.description,
			duration: parseInt(formValues.duration),
			authors: courseAuthors.map((author) => author.id),
		};
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (!isFormValid()) {
			return;
		}

		const newCourse = buildNewCourse();
		const updateCourse = buildUpdatedCourse();

		if (isUpdate) {
			dispatch(updateCourse(updateCourse, courseId));
		} else {
			dispatch(addCourse(newCourse));
		}

		navigateCourses('/courses');
	};

	const handleCancelCourse = () => {
		navigateCourses('/courses');
	};

	return (
		<div className={styles.newCourseFormWrapper}>
			<h1>Course edit/create page</h1>
			<form className={styles.newCourseForm}>
				<h2>Main Info</h2>
				<label className={styles.formLabel} htmlFor='new-course-title'>
					Title
					<Input
						id='new-course-title'
						name='title'
						style={{
							borderColor: !formValid.isTitleValid && 'var(--color-red)',
						}}
						type='text'
						placeholder='Enter title...'
						value={formValues.title || ''}
						onChange={handleInputChange}
					/>
					{!formValid.isTitleValid && (
						<p className={styles.invalid}>Title is required.</p>
					)}
				</label>
				<label className={styles.formLabel} htmlFor='new-course-desc'>
					Description
					<Textarea
						id='new-course-desc'
						name='description'
						style={{
							borderColor: !formValid.isDescriptionValid && 'var(--color-red)',
						}}
						placeholder='Enter description...'
						value={formValues.description || ''}
						onChange={handleInputChange}
					/>
					{!formValid.isDescriptionValid && (
						<p className={styles.invalid}>Description is required.</p>
					)}
				</label>
				<h2>Duration</h2>
				<div className={styles.duration}>
					<label className={styles.formLabel} htmlFor='new-course-duration'>
						Duration
						<Input
							id='new-course-duration'
							name='duration'
							style={{
								borderColor: !formValid.isDurationValid && 'var(--color-red)',
							}}
							type='number'
							min='1'
							placeholder='Enter duration in minutes...'
							value={formValues.duration || ''}
							onChange={handleInputChange}
						/>
						{!formValid.isDurationValid && (
							<p className={styles.invalid}>Duration is required.</p>
						)}
					</label>
					<p className={styles.durationText}>
						<span>
							{formatCourseDuration(formValues.duration).durationTime}{' '}
						</span>
						{formatCourseDuration(formValues.duration).durationLabel}
					</p>
				</div>
				<div className={styles.authors}>
					<div className={styles.authorName}>
						<h2>Authors</h2>
						<div className={styles.authorLabel}>
							<label className={styles.formLabel} htmlFor='new-course-authors'>
								Author Name
								<Input
									id='new-course-authors'
									name='authorName'
									type='text'
									placeholder='Enter authors...'
									value={formValues.authorName || ''}
									onChange={handleInputChange}
								/>
							</label>
							<Button
								type='button'
								buttonText='Create author'
								onClick={handleCreateAuthor}
							/>
						</div>
					</div>
					<div>
						<h2>Course authors</h2>
						<div className={styles.courseAuthorsList}>
							{courseAuthors.length === 0 ? (
								<p>Author list is empty</p>
							) : (
								courseAuthors.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										onDelete={() => handleDeleteAuthor(author)}
									/>
								))
							)}
						</div>
					</div>
				</div>
				<h3>Authors List</h3>
				<div className={styles.authorsList}>
					{authors.map((author) => (
						<AuthorItem
							key={author.id}
							author={author}
							onAdd={() => handleAddAuthor(author)}
							onDelete={() => handleDeleteAuthor(author)}
						/>
					))}
				</div>
			</form>
			<div className={styles.actionBtns}>
				<Button
					type='button'
					buttonText='Cancel'
					onClick={handleCancelCourse}
				/>
				<Button
					type='submit'
					buttonText={isUpdate ? 'Update course' : 'Create course'}
					onClick={handleFormSubmit}
				/>
			</div>
		</div>
	);
};

CourseForm.propTypes = {
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

export default CourseForm;
