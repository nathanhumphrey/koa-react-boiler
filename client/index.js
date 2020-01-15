import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/App';

const el = document.getElementById('app');
if (el) ReactDOM.hydrate(<App />, el);
