import { useState } from 'react';
import MovieList from '../components/MovieList';
import css from './Movies.module.css';
import { fetchMoviesByQuery } from '../services/api';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

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

      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={css.noResults}>No movies found.</p>
      )}
    </>
  );
}
