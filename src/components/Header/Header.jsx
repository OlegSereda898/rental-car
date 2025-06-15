import css from "./Header.module.css";
import logo from "../../assets/Logo.svg";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to="/">
          <img src={logo} alt="Logo" className={css.logo} />
        </Link>
        <nav className={css.navigate}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.active}` : css.navLink
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
