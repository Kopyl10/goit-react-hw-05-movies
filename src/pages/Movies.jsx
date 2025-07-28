import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from './MovieList';
import css from './Movies.module.css';
import { fetchMoviesByQuery } from '../services/api';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const doFetch = async () => {
      try {
        const results = await fetchMoviesByQuery(query);
        setMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    doFetch();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="query"
          defaultValue={query}
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
        query && <p className={css.noResults}>No movies found for “{query}.”</p>
      )}
    </>
  );
}
