import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';
import { fetchTrendingMovies } from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then(results => setMovies(results))
      .catch(console.error);
  }, []);

  return (
    <section>
      <h1 className={css.title}>Trending Today</h1>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.movieLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
