'use strict';
import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState({ showError: false, msg: '' });
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('batman');

	const fetchMovies = async url => {
		setIsLoading(true);

		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data.Error);
			if (data.Response === 'True') {
				// Movies found
				setMovies(data.Search);
				console.log('Movies after set ', movies);
				setError({ showError: false, msg: '' });
			} else {
				// Movies NOT found

				setError({ showError: true, msg: data.Error });
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMovies(`${API_ENDPOINT}&s=${query}`);
	}, [query]);

	return (
		<AppContext.Provider
			value={{ isLoading, error, movies, query, setQuery }}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };