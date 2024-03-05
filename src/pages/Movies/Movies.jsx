import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMoviesApi } from '../../api/movies';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
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

  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
      {movies.length === 0 && !isLoading && <p>No movies found.</p>}
    </div>
  );
};

export default Movies;
