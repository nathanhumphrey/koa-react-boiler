import React from 'react';
import PropTypes from 'prop-types';

import './hello.css';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <p>Hello, from {this.props.hello}</p>
      </div>
    );
  }
}

Hello.propTypes = {
  hello: PropTypes.string
};

export { Hello };
