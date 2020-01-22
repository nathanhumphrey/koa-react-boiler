import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './nav.css';

const Nav = ({ routes }) => {
  return (
    <>
      {routes && (
        <nav>
          <ul>
            {routes
              .filter(route => route.nav)
              .map(route => (
                <li key={route.key}>
                  <NavLink
                    to={route.path}
                    activeClassName="active"
                    exact={route.exact ? true : false}
                  >
                    {route.linkText}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </>
  );
};

Nav.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      exact: PropTypes.bool,
      key: PropTypes.string,
      nav: PropTypes.bool,
      path: PropTypes.string,
      linkText: PropTypes.string
    })
  )
};

export { Nav };
