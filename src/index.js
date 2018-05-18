import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from 'state/configureStore';

import 'resources/styles/global.scss';

import App from 'pages/App';

import { handleImplicitRedirect } from 'veritone-oauth-helpers';

function bootstrap() {
  if (process.env.NODE_ENV === 'development' && window.name === '_auth') {
    // if this is an OAuth redirect window, deal with the OAuth response but
    // don't render the app.
    return handleImplicitRedirect(window.location.hash, window.opener);
  }

  const store = configureStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

bootstrap();
