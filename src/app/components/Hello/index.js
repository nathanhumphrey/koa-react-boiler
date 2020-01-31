/**
 * @fileoverview Defines the Hello component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './hello.css';

/**
 * Component that displays a greeting.
 * @example
 * const name = 'Jane Doe'
 * return (
 *  <Hello name={name} />
 * )
 */
const Hello = ({ name }) => {
  return (
    <div>
      <p>Hello, from {name}</p>
    </div>
  );
};

Hello.propTypes = {
  /** Name to use in the hello greeting */
  name: PropTypes.string
};

export { Hello };
