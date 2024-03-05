import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMoviesApi } from '../../api/movies.js';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movies, setMovies] = useState(null);

  const getTrendingMovies = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getTrendingMoviesApi();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies && (
        <div>
          <h3>Trending Today</h3>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
