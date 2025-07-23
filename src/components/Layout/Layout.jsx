import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

export default function Layout() {
  const setActive = ({ isActive }) => (isActive ? css.active : css.link);

  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={setActive}>
            Home
          </NavLink>
          <NavLink to="/movies" className={setActive}>
            Movies
          </NavLink>
        </nav>
      </header>

      <main className={css.container}>
        <Outlet />
      </main>
    </>
  );
}
