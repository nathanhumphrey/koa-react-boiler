import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../app/App';

const el = document.getElementById('app');
if (el)
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    el
  );
