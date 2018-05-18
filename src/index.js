import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { store } from 'state/configureStore';

import 'resources/styles/global.scss';

import App from 'pages/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
