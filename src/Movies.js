'use strict';
import React from 'react';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const url =
	'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Movies = () => {
	const data = useGlobalContext();
	const { movies, isLoading } = useGlobalContext();

	if (isLoading) {
		return <div className='loading'></div>;
	}
	console.log('This the array in movies: ', movies);
	return (
		<section className='movies'>
			{movies.map((movie) => {
				let {
					imdbID: id,
					Poster: poster,
					Title: title,
					Year: year,
				} = movie;

				// check if picture available
				poster = poster === 'N/A' ? url : poster;

				return (
					<Link to={`/movies/${id}`} key={id} className='movie'>
						<article>
							<img src={poster} alt={title} />
							<div className='movie-info'>
								<h4 className='title'>{title}</h4>
							</div>
						</article>
					</Link>
				);
			})}
		</section>
	);
};

export default Movies;
