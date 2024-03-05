import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/movies" className={styles.link}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
