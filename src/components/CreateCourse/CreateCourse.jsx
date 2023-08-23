import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { formatCourseDuration } from '../../helpers/formatCourseDuration';
import { formatCourseDate } from '../../helpers/formatCourseDate';

import AuthorItem from './components/AuthorItem';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ courses, setCourses }) => {
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
		isAuthorNameValid: true,
	});
	const [authors, setAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState([]);

	const navigateCourses = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const isFormValid = () => {
		const isTitleValid = formValues.title !== '';
		const isDescriptionValid = formValues.description !== '';
		const isDurationValid = formValues.duration > 0;
		const isAuthorNameValid = formValues.authorName !== '';

		setFormValid({
			isTitleValid,
			isDescriptionValid,
			isDurationValid,
			isAuthorNameValid,
		});

		return (
			isTitleValid && isDescriptionValid && isDurationValid && isAuthorNameValid
		);
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
			id: Date.now().toString(),
			name: formValues.authorName,
		};
		setAuthors([...authors, newAuthor]);
		setFormValues({ ...formValues, authorName: '' });
	};

	const buildNewCourse = () => {
		return {
			id: Date.now().toString(),
			title: formValues.title,
			description: formValues.description,
			creationDate: formatCourseDate(new Date()),
			duration: parseInt(formValues.duration),
			authors: courseAuthors.map((author) => author.id),
		};
	};

	const handleCreateCourse = (event) => {
		event.preventDefault();

		if (!isFormValid()) {
			return;
		}

		const newCourse = buildNewCourse();
		setCourses([...courses, newCourse]);
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
						value={formValues.title}
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
						value={formValues.description}
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
							value={formValues.duration}
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
									style={{
										borderColor:
											!formValid.isAuthorNameValid && 'var(--color-red)',
									}}
									type='text'
									placeholder='Enter authors...'
									value={formValues.authorName}
									onChange={handleInputChange}
								/>
								{!formValid.isAuthorNameValid && (
									<p className={styles.invalid}>Author is required.</p>
								)}
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
							{courseAuthors.map((author) => (
								<AuthorItem
									key={author.id}
									author={author}
									onDelete={() => handleDeleteAuthor(author)}
								/>
							))}
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
					buttonText='Create course'
					onClick={handleCreateCourse}
				/>
			</div>
		</div>
	);
};

CreateCourse.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
		})
	),
	setCourses: PropTypes.func,
};

export default CreateCourse;
