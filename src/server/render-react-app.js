import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { ChunkExtractor } from '@loadable/server';

// prepare React CDN resource URLs
let reactJs, reactDomJs;

if (process.env.NODE_ENV === 'production') {
  reactJs = 'https://unpkg.com/react@16/umd/react.production.min.js';
  reactDomJs = 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js';
} else {
  reactJs = 'https://unpkg.com/react@16/umd/react.development.js';
  reactDomJs = 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';
}

// component to manage the HTML document returned to browser
const Html = ({ children, scripts, styles, links, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
        {links}
        {styles}
      </head>
      <body>
        <div id="app">{children}</div>
        <script crossOrigin="true" src={reactJs} />
        <script crossOrigin="true" src={reactDomJs} />
        {scripts}
      </body>
    </html>
  );
};

Html.propTypes = {
  children: PropTypes.node,
  scripts: PropTypes.array,
  styles: PropTypes.array,
  links: PropTypes.string,
  title: PropTypes.string
};

const context = {};

export default ctx => {
  // loadable-components implementation
  const nodeStats = path.resolve(
    __dirname,
    '../../public/dist/node/loadable-stats.json'
  );

  const webStats = path.resolve(
    __dirname,
    '../../public/dist/web/loadable-stats.json'
  );

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const jsx = webExtractor.collectChunks(
    <StaticRouter location={ctx.request.url} context={context}>
      <App />
    </StaticRouter>
  );

  const scripts = webExtractor.getScriptElements(),
    styles = webExtractor.getStyleElements();

  const props = { scripts, styles, title: '' };

  // now, inject proper document title
  const markup = renderToString(<Html {...props}>{jsx}</Html>).replace(
    /<title><\/title>/,
    `<title>${DocumentTitle.rewind()}</title>`
  );

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    ctx.redirect(301, context.url);
  } else {
    // we're good, send the response
    ctx.body = markup;
  }
};
