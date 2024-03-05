import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMoviesApi } from '../../api/movies';
import styles from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setIsLoading(true);
    setError('');
    setSearched(true);

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

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name..."
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <ul className={styles.movieList}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movieItem}>
              <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {searched && movies.length === 0 && !isLoading && <p>No movies found.</p>}
    </div>
  );
};

export default Movies;
