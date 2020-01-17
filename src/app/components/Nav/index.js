import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import './nav.css';

const Nav = () => (
  <nav>
    <ul>
      {routes.map(route => (
        <li key={route.path}>
          <NavLink
            to={route.path}
            activeClassName="active"
            exact={route.exact ? true : false}
          >
            {route.title}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export { Nav };
