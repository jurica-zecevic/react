import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

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
		<form onSubmit={handleSubmit} className={styles.form}>
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

SearchBar.propTypes = {
	onSearch: PropTypes.func,
};

export default SearchBar;
