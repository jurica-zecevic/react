import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { validateNewCourseField } from '../../helpers/newCourseValidation';

import AuthorItem from './components/AuthorItem';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import styles from './CreateCourse.module.css';

const CreateCourse = ({ courses, setCourses }) => {
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [durationValue, setDurationValue] = useState('');
	const [authorNameValue, setAuthorNameValue] = useState('');
	const [authors, setAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [titleValid, isTitleValid] = useState(true);
	const [descriptionValid, isDescriptionValid] = useState(true);
	const [durationValid, isDurationValid] = useState(true);
	const [authorNameValid, isAuthorNameValid] = useState(true);

	const navigateCourses = useNavigate();

	const handleTitleChange = (value) => {
		setTitleValue(value);
		isTitleValid(validateNewCourseField(value));
	};

	const handleDescriptionChange = (value) => {
		setDescriptionValue(value);
		isDescriptionValid(validateNewCourseField(value));
	};

	const handleDurationChange = (value) => {
		setDurationValue(value);
		isDurationValid(validateNewCourseField(value));
	};

	const handleAuthorNameChange = (value) => {
		setAuthorNameValue(value);
		isAuthorNameValid(validateNewCourseField(value));
	};

	const handleAddAuthor = (author) => {
		setCourseAuthors([...courseAuthors, author]);
		setAuthors(authors.filter((a) => a.id !== author.id));
	};

	const handleDeleteAuthor = (author) => {
		setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
	};

	const formatDuration = (duration) => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours}:${minutes.toString().padStart(2, '0')}`;
	};

	const formatDate = (date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	};

	const handleCreateAuthor = () => {
		const newAuthor = {
			id: Date.now().toString(),
			name: authorNameValue,
		};
		setAuthors([...authors, newAuthor]);
		setAuthorNameValue('');
		isAuthorNameValid(true);
	};

	const handleCreateCourse = (event) => {
		event.preventDefault();

		if (titleValue === '' || descriptionValue === '' || durationValue === '') {
			isTitleValid(titleValue !== '');
			isDescriptionValid(descriptionValue !== '');
			isDurationValid(durationValue !== '');
			return;
		}

		const newCourse = {
			id: Date.now().toString(),
			title: titleValue,
			description: descriptionValue,
			creationDate: formatDate(new Date()),
			duration: parseInt(durationValue),
			authors: courseAuthors.map((author) => author.id),
		};

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
						style={{ borderColor: !titleValid && 'var(--color-red)' }}
						type='text'
						placeholder='Enter title...'
						value={titleValue}
						required
						onChange={({ target }) => handleTitleChange(target.value)}
					/>
					{!titleValid && <p className={styles.invalid}>Title is required.</p>}
				</label>
				<label className={styles.formLabel} htmlFor='new-course-desc'>
					Description
					<Textarea
						id='new-course-desc'
						style={{ borderColor: !descriptionValid && 'var(--color-red)' }}
						placeholder='Enter description...'
						value={descriptionValue}
						required
						onChange={({ target }) => handleDescriptionChange(target.value)}
					/>
					{!descriptionValid && (
						<p className={styles.invalid}>Description is required.</p>
					)}
				</label>
				<h2>Duration</h2>
				<div className={styles.duration}>
					<label className={styles.formLabel} htmlFor='new-course-duration'>
						Duration
						<Input
							id='new-course-duration'
							style={{ borderColor: !durationValid && 'var(--color-red)' }}
							type='number'
							min='1'
							placeholder='Enter duration in minutes...'
							value={durationValue}
							required
							onChange={({ target }) => handleDurationChange(target.value)}
						/>
						{!durationValid && (
							<p className={styles.invalid}>Duration is required.</p>
						)}
					</label>
					<p className={styles.durationText}>
						<span>{formatDuration(durationValue)}</span> hours
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
									style={{
										borderColor: !authorNameValid && 'var(--color-red)',
									}}
									type='text'
									placeholder='Enter authors...'
									value={authorNameValue}
									required={!authors.length && !courseAuthors.length}
									onChange={({ target }) =>
										handleAuthorNameChange(target.value)
									}
								/>
								{!authorNameValid && (
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
	courses: PropTypes.array,
	setCourses: PropTypes.func,
};

export default CreateCourse;
