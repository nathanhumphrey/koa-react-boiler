import dotenv from 'dotenv';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import App from '../app/App';
import { js } from './js'; // get hashed name from webpack
import { css } from './css'; // get hashed from webpack

dotenv.config();
const { NODE_ENV = 'development' } = process.env;

// prepare React CDN resource URLs
const reactJs =
  NODE_ENV === 'production'
    ? 'https://unpkg.com/react@16/umd/react.production.min.js'
    : 'https://unpkg.com/react@16/umd/react.development.js';

const reactDomJs =
  NODE_ENV === 'production'
    ? 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
    : 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

// component to manage the HTML document returned to browser
const Html = ({
  children,
  script = '/main.js',
  style = '/styles.css',
  title = 'Koa React Boilerplate - Rendered'
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        <link rel="stylesheet" type="text/css" href={style} />
      </head>
      <body>
        <div id="app">{children}</div>
        <script crossOrigin="true" src={reactJs} />
        <script crossOrigin="true" src={reactDomJs} />
        <script src={script} />
      </body>
    </html>
  );
};

Html.propTypes = {
  children: PropTypes.node,
  script: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.string
};

const context = {};

export default ctx => {
  const renderComponent =
    NODE_ENV === 'production' ? (
      <Html script={js} style={css}>
        <StaticRouter location={ctx.request.url} context={context}>
          <App />
        </StaticRouter>
      </Html>
    ) : (
      <Html>
        <StaticRouter location={ctx.request.url} context={context}>
          <App />
        </StaticRouter>
      </Html>
    );

  const markup = renderToString(renderComponent);

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    ctx.redirect(301, context.url);
  } else {
    // we're good, send the response
    ctx.body = markup;
  }
};
