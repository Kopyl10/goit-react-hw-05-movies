import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../services/api';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetch = async () => {
      try {
        const results = await fetchMoviesByQuery(query);
        setMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetch();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
