import React from 'react';
import { get, difference } from 'lodash';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { handleImplicitRedirect } from 'veritone-oauth-helpers';

import configureStore from 'state/configureStore';

import 'resources/styles/global.scss';

import App from 'pages/App';

const requiredConfigKeys = [
  'apiRoot',
  'switchAppRoute',
  'loginRoute',
  'graphQLEndpoint',
  get(window.config, 'useOAuthGrant') && 'OAuthClientID'
].filter(Boolean);

const requiredConfigMissing = requiredConfigKeys.some(
  k => !get(window.config, k)
);

if (requiredConfigMissing) {
  const missingKeys = difference(
    requiredConfigKeys,
    Object.keys(window.config)
  );

  throw new Error(
    `The app requires the keys ${JSON.stringify(
      requiredConfigKeys
    )} to exist in config, but the following keys were not found: ${JSON.stringify(
      missingKeys
    )}`
  );
}

function bootstrap() {
  if (window.name === '_auth') {
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
