import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../Nav';

const Page = props => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{props.children}</main>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node
};

export { Page };
