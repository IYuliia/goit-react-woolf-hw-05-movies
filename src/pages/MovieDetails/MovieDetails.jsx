import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getMovieDetailsApi } from '../../api/movies';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useRef(location.state?.from || '/');
  const handleGoBack = () => {
    navigate(goBack.current);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getMovieDetailsApi(movieId);
        setMovie(data);
      } catch (error) {
        console.log('Error fetching movie details:', error);
        setError('Error fetching movie details');
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  // const handleGoBack = () => {
  //   navigate(location.state?.from || '/');
  // };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.button}>
        Go Back
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <div className={styles.details}>
            <div className={styles.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={styles.info}>
              <h2>{movie.title}</h2>
              <p>Year: {movie.release_date}</p>
              <p>User Score: {movie.vote_average}</p>
              <p>Overview: {movie.overview}</p>
              <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
              <h3>Additional Information</h3>
            </div>
          </div>
          <h2>Additional information</h2>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            </li>
            <li className={styles.item}>
              <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
