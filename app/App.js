import React from 'react';
import Hello from './Hello';
import '../static/styles.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello hello={'Hello, Koa React App!'} />
      </div>
    );
  }
}

export default App;
