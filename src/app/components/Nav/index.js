/**
 * @fileoverview Defines the Nav component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './nav.css';

/**
 * Component that provides application navigation.
 * @example
 * const routes = [{
 *   linkText: 'Home',
 *   path: '/',
 *   key: '/',
 *   exact: true,
 *   nav: true
  }]
 * return (
 *  <Nav routes={routes} />
 * )
 */
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
  /** Array of routes to include in the Nav */
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      /** whether the match must be exact */
      exact: PropTypes.bool,
      /** key to use for react list component tracking */
      key: PropTypes.string,
      /** whether the route should be included in the Nav or not */
      nav: PropTypes.bool,
      /** the patch match for the route */
      path: PropTypes.string,
      /** the text to display for the link */
      linkText: PropTypes.string
    })
  )
};

export { Nav };
