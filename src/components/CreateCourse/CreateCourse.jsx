import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addCourseAction } from '../../store/courses/actions';
import { saveAuthorsAction } from '../../store/authors/actions';

import { formatCourseDuration } from '../../helpers/formatCourseDuration';
import { formatCourseDate } from '../../helpers/formatCourseDate';

import AuthorItem from './components/AuthorItem';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import styles from './CreateCourse.module.css';

const CreateCourse = () => {
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

	const dispatch = useDispatch();
	const navigateCourses = useNavigate();

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
			id: Date.now().toString(),
		};
		dispatch(saveAuthorsAction(newAuthor));
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
		dispatch(addCourseAction(newCourse));
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
									type='text'
									placeholder='Enter authors...'
									value={formValues.authorName}
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
					buttonText='Create course'
					onClick={handleCreateCourse}
				/>
			</div>
		</div>
	);
};

export default CreateCourse;
