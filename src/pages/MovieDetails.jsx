import { Outlet } from 'react-router-dom';

export default function MovieDetails() {
  return (
    <div>
      <h2>Movie Details Page</h2>
      <Outlet />
    </div>
  );
}
