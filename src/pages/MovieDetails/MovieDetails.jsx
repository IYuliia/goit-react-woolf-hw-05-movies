import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getCastApi,
  getMovieDetailsApi,
  getReviewsApi,
} from '../../api/movies';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const getMovieDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Movie ID:', movieId);
      setError('');
      const data = await getMovieDetailsApi(movieId);
      console.log('Movie details:', data);
      setMovie(data);
    } catch (error) {
      console.log('Error fetching movie details:', error);
      setError('Error fetching movie details');
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  const getCast = useCallback(async () => {
    try {
      const castData = await getCastApi(movieId);
      setCast(castData.cast);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  }, [movieId]);

  const getReviews = useCallback(async () => {
    try {
      const reviewsData = await getReviewsApi(movieId);
      setReviews(reviewsData.results);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [movieId]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      {/* //   <Link to="/">Go Back</Link> */}
      <button onClick={handleGoBack}>Go Back</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>Year: {movie.release_date}</p>
          <p>User Score: {movie.vote_average}</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
          <h3>Additional Information</h3>
          <ul>
            <li>
              <Link to={`/movies/${movieId}/cast`} onClick={getCast}>
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={`/movies/${movieId}/reviews`}
                onClick={() => {
                  getReviews();
                  setShowReviews(true);
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          {cast && <Cast cast={cast} />}
          {showReviews && reviews.length > 0 && <Reviews reviews={reviews} />}
          {showReviews && reviews.length === 0 && (
            <p>We don't have any reviews for this movie.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
