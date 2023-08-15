import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch(searchQuery);
	};

	useEffect(() => {
		if (searchQuery === '') {
			onSearch('');
		}
	}, [searchQuery, onSearch]);

	return (
		<form onSubmit={handleSubmit} className={styles.searchForm}>
			<Input
				type='text'
				name='search'
				value={searchQuery}
				onChange={handleInputChange}
				placeholder='Search courses by title or id'
			/>
			<Button type='submit' buttonText='Search' />
		</form>
	);
};

export default SearchBar;
