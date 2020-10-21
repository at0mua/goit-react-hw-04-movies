import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../../routes";

import s from "./Navigations.module.css";

const Navigation = () => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink
          className={s.link}
          activeClassName={s.link_active}
          to={routes.home}
          exact
        >
          Home
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink
          className={s.link}
          activeClassName={s.link_active}
          to={routes.movies}
          exact
        >
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
