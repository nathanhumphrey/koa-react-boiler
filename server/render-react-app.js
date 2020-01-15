import dotenv from 'dotenv';
import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';

import App from '../app/App';
import { js } from './js.js'; // from webpack
import { css } from './css.js'; // from webpack

dotenv.config();
const { NODE_ENV = 'development' } = process.env;

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
        {NODE_ENV === 'production' ? (
          <>
            <script
              crossOrigin="true"
              src="https://unpkg.com/react@16/umd/react.production.min.js"
            />
            <script
              crossOrigin="true"
              src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
            />
          </>
        ) : (
          <>
            <script
              crossOrigin="true"
              src="https://unpkg.com/react@16/umd/react.development.js"
            />
            <script
              crossOrigin="true"
              src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
            />
          </>
        )}
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

export default ctx => {
  const markup = renderToString(
    <React.Fragment>
      {NODE_ENV === 'production' ? (
        <Html script={js} style={css}>
          <App />
        </Html>
      ) : (
        <Html>
          <App />
        </Html>
      )}
    </React.Fragment>
  );
  ctx.body = markup;
};
