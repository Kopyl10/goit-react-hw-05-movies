import { useEffect, useState } from 'react';
import css from './Home.module.css';
import MovieList from './MovieList';
import { fetchTrendingMovies } from '../services/api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(results => setMovies(results))
      .catch(console.error);
  }, []);

  return (
    <section>
      <h1 className={css.title}>Trending Today</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>Loading movies…</p>
      )}
    </section>
  );
}
