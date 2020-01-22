import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../Nav';
import { routes } from '../../routes';

const Page = ({ children }) => {
  return (
    <div className="page container">
      <header>
        <Nav routes={routes} />
      </header>
      <main>{children}</main>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node
};

export { Page };
