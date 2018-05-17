import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'resources/styles/global.scss';

import App from 'pages/App';

import { Provider } from 'react-redux';
import { store } from './state/configureStore';

const load = App =>
  render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

if (module.hot) {
  module.hot.accept('pages/App', () => {
    // const PageComponent = require('pages/App').default;
    return load(App);
  });
}

load(App);
