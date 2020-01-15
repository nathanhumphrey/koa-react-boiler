import React from 'react';
import { hot } from 'react-hot-loader/root';
import Hello from './components/Hello';
import './app.css';

const App = () => {
  return (
    <div>
      <Hello hello={'the Koa React App!'} />
    </div>
  );
};

export default hot(App);
