import React from 'react';
import PropTypes from 'prop-types';

const Html = ({
  children,
  script = 'main.js',
  style = 'styles.min.css',
  title = 'Koa React Boilerplate'
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

export default Html;
