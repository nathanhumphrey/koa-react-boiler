import React from 'react';
import PropTypes from 'prop-types';

import './hello.css';

const Hello = ({ hello }) => {
  return (
    <div>
      <p>Hello, from {hello}</p>
    </div>
  );
};

Hello.propTypes = {
  hello: PropTypes.string
};

export { Hello };
