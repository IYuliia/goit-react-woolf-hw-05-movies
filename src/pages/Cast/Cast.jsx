// import { useParams } from 'react-router-dom';

const Cast = ({ cast }) => {
  // const { movieId } = useParams();

  return (
    <div>
      {cast.map(actor => (
        <div key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
          <p>Name: {actor.name}</p>
          <p>Character: {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
