import React from 'react';
import { renderToString } from 'react-dom/server';

import Html from '../app/Html';
import App from '../app/App';

export default ctx => {
  const markup = renderToString(
    <Html>
      <App />
    </Html>
  );
  ctx.body = markup;
};
