import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import loadable from '@loadable/component';
import { routes } from './routes';
import './app.css';

// dynamic user-defined pages, code splitting applied per page
const About = loadable(() => import('./pages/about'));
const Home = loadable(() => import('./pages/home'));
// required no match page
const NoMatch = loadable(() => import('./pages/404'));

// create a hash for supported pages, used in <Route> creation for the application
const pages = { About, Home, NoMatch };

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
            <DocumentTitle title={route.title}>
              {React.createElement(pages[route.page])}
            </DocumentTitle>
          </Route>
        ))}
        <Route key="404" path="*">
          <pages.NoMatch />
        </Route>
      </Switch>
    </>
  );
};

export default hot(App);
