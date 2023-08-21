import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';

import styles from './EmptyCourseList.module.css';

const EmptyCourseList = ({ userRole }) => {
	const navigateAddCourse = useNavigate();

	const handleAddNewCourse = () => {
		navigateAddCourse('/courses/add');
	};

	return (
		<section className={styles.empty}>
			<h1>Your List Is Empty</h1>
			<p>Please use ’Add New Course’ button to add your first course</p>
			{userRole === 'admin' ? (
				<Button
					type='button'
					buttonText='Add new course'
					onClick={handleAddNewCourse}
				/>
			) : (
				<p>
					You don't have permissions to create a course. Please log in as ADMIN
				</p>
			)}
		</section>
	);
};

export default EmptyCourseList;
