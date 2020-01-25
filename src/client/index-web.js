import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from '../app/App';

loadableReady(() => {
  const el = document.getElementById('app');
  if (el)
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      el
    );
});
