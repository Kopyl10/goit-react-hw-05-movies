import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingMovies } from '../services/api';
import css from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending Today</h1>
      <ul className={css.list}>
        {movies.map(m => (
          <li key={m.id} className={css.item}>
            <Link
              to={`/movies/${m.id}`}
              state={{ from: location }}
              className={css.movieLink}
            >
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
