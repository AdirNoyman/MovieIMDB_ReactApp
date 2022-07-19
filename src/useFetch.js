import { useState, useEffect } from 'react';
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const useFetch = urlParams => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState({ showError: false, msg: '' });
	const [data, setData] = useState(null);

	const fetchMovies = async url => {
		setIsLoading(true);

		try {
			const response = await fetch(url);
			const result = await response.json();

			if (result.Response === 'True') {
				// Movies found
				setData(result.Search || result);

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
		fetchMovies(`${API_ENDPOINT}&s=${urlParams}`);
	}, [urlParams]);

	return { isLoading, error, data };
};

export default useFetch;
