import React from 'react';
import Hello from './components/Hello';
import './app.css';

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
