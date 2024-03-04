import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Movies</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;