import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './Movies.module.css';
import { fetchMoviesByQuery } from '../services/api';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    const results = await fetchMoviesByQuery(query);
    setMovies(results);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

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
    </>
  );
}
