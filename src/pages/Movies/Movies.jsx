import Form from 'components/Form/Form';
import MovieList from 'components/MovieList/MovieList';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMoviesApi } from '../../api/movies';
import styles from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const getMovies = async () => {
      if (!searchParams) return;

      setIsLoading(true);
      setError('');

      try {
        const data = await searchMoviesApi(searchQuery);
        setMovies(data.results);
      } catch (error) {
        console.log('Error searching movies:', error);
        setError('Error searching movies');
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [searchParams, searchQuery]);

  const handleSearchSubmit = inputValue => {
    setSearchParams({ query: inputValue });
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSearchSubmit} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} query={searchQuery} />}
      {movies.length === 0 && !isLoading && searchQuery && (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Movies;
