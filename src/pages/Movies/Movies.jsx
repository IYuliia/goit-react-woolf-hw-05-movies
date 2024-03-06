import MovieList from 'components/MovieList/MovieList';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMoviesApi } from '../../api/movies';
import styles from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [, setSearchParams] = useSearchParams();
  // const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const getMovies = async () => {
      if (!query) return;

      setIsLoading(true);
      setError('');

      try {
        const data = await searchMoviesApi(query);
        setMovies(data.results);
      } catch (error) {
        console.log('Error searching movies:', error);
        setError('Error searching movies');
      } finally {
        setIsLoading(false);
      }
    };
    if (searched) {
      getMovies();
    }
  }, [query, searched]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearched(true);
    setSearchParams({ query });
  };

  return (
    <div className={styles.container}>
      <form className={styles.search} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searched && movies.length > 0 && (
        <MovieList movies={movies} query={query} />
      )}
      {searched && movies.length === 0 && !isLoading && <p>No movies found.</p>}
    </div>
  );
};

export default Movies;
