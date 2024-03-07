import { getCastApi } from 'api/movies';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        setError('');
        const castData = await getCastApi(movieId);
        setCast(castData.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
        setError('Error fetching cast');
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading cast...</p>}
      {error && <p>{error}</p>}
      {cast.length > 0 && (
        <div>
          <h2>Cast</h2>
          <ul>
            {cast.map(actor => (
              <div key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                  }
                  alt={actor.name}
                />
                <p>Name: {actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cast;
