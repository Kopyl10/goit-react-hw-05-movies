import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../services/api';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(setCast)
      .catch(err => setError(err.message));
  }, [movieId]);

  if (error) return <p>Something went wrong: {error}</p>;
  if (!cast.length) return <p>No cast info available.</p>;

  return (
    <ul>
      {cast.map(({ cast_id, profile_path, name, character }) => (
        <li key={cast_id}>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              width="100"
              height="150"
            />
          )}
          <p>
            <strong>{name}</strong>
          </p>
          <p>as {character}</p>
        </li>
      ))}
    </ul>
  );
}
