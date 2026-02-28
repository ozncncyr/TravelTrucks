import { NavLink, useLocation, useMatch } from "react-router-dom";

import css from "./Navigation.module.css";

export default function Navigation() {
  const { pathname } = useLocation();
  const isDetailsPage = useMatch("/catalog/:camperId");

  return (
    <nav className={css.navWrapper}>
      <ul className={css.navigationList}>
        <li>
          <NavLink
            className={`${css.linkItem} ${pathname === "/" && css.active}`}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`${css.linkItem} ${
              pathname === "/catalog" && css.active
            }`}
            to="/catalog"
          >
            Catalog
          </NavLink>
        </li>
      </ul>
      {isDetailsPage && (
        <button
          className={css.backButton}
          onClick={() => window.history.back()}
        >
          ← Back to Catalog
        </button>
      )}
    </nav>
  );
}
