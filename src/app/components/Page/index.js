import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../Nav';

const Page = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node
};

export { Page };
