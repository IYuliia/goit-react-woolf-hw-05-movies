import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetailsApi } from '../../api/movies';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);

  const getMovieDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Movie ID:', movieId);
      setError('');
      const data = await getMovieDetailsApi(movieId);
      setMovie(data);
    } catch (error) {
      console.log('Error fetching movie details:', error);
      setError('Error fetching movie details');
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  return (
    <div>
      <Link to="/">Go Back</Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <img src={movie.poster_path} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>Year: {movie.release_date}</p>
          <p>User Score: {movie.vote_average}</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
          <h3>Additional Information</h3>
          <ul>
            <li>
              <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
