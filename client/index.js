import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/App';

let el = document.getElementById('app');
if (el) ReactDOM.hydrate(<App />, el);
