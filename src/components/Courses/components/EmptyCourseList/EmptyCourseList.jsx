import React from 'react';

import Button from '../../../../common/Button/Button';

import styles from './EmptyCourseList.module.css';

const EmptyCourseList = () => {
	return (
		<section className={styles.emptyCourseList}>
			<h1>Your List Is Empty</h1>
			<p>Please use ’Add New Course’ button to add your first course</p>
			{<Button type='button'>Add new course</Button>}
		</section>
	);
};

export default EmptyCourseList;
