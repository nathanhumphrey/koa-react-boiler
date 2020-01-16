import React from 'react';
import { hot } from 'react-hot-loader/root';

import { Route, Link, Switch } from 'react-router-dom';

import Hello from './components/Hello';

import './app.css';

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/app">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route key="/app" path="/app">
          <Hello hello={'the Koa React App!'} />
        </Route>
        <Route key="/about" path="/about">
          <Hello hello={'the help page!'} />
        </Route>
        <Route render={() => <div>No match.</div>} />
      </Switch>
    </>
  );
};

export default hot(App);
