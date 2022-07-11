'use strict';
import React from 'react';
import { useGlobalContext } from './context';
const SearchForm = () => {
	const { query, setQuery, error } = useGlobalContext();

	return (
		<form className='search-form' onSubmit={e => e.preventDefault()}>
			<h2>Search Movies</h2>
			<input
				type='text'
				className='form-input'
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>

			{error.showError && <div className='error'>{error.msg}</div>}
		</form>
	);
};

export default SearchForm;