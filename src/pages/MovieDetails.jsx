import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { fetchMovieDetails } from '../services/api';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchData();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, overview, genres } = movie;
  const backLink = location.state?.from ?? '/';

  return (
    <div>
      <Link to={backLink}>⬅ Go back</Link>
      <h2>{title}</h2>
      <p>{overview}</p>
      <p>
        <strong>Genres: </strong>
        {genres.map(g => g.name).join(', ')}
      </p>

      <hr />
      <p>Additional info:</p>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>
      <hr />

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
