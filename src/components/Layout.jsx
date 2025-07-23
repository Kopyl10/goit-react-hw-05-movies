import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const linkStyle = ({ isActive }) => ({
  padding: '8px 12px',
  textDecoration: 'none',
  color: isActive ? '#fff' : '#222',
  background: isActive ? '#3f51b5' : 'transparent',
  borderRadius: 4,
  marginRight: 8,
});

export default function Layout() {
  return (
    <>
      <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/movies" style={linkStyle}>
          Movies
        </NavLink>
      </header>

      <main style={{ padding: 16 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
