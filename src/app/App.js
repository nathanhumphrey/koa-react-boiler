import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import { routes } from './routes';

import './app.css';

const App = () => {
  return (
    <>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact ? true : false}
          >
            {route.page}
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default hot(App);
