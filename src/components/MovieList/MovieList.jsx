import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies, query }) => {
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li className={styles.item} key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { query },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
