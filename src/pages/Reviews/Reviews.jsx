import { getReviewsApi } from 'api/movies';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const reviewsData = await getReviewsApi(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews');
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        <div>
          <h2>Reviews</h2>
          {reviews.map(review => (
            <div key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;
