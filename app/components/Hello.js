import React from 'react';
import PropTypes from 'prop-types';

import './hello.css';

// import icon from '../assets/react-icon.jpg';

class Hello extends React.Component {
  render() {
    return (
      <div>
        {/*<img src={`/${icon}`} />*/}
        <p>Hello, from {this.props.hello}</p>
      </div>
    );
  }
}

Hello.propTypes = {
  hello: PropTypes.string
};

export default Hello;
