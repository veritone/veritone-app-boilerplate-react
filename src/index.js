import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { handleImplicitRedirect } from 'veritone-oauth-helpers';

import validateAppConfig from '~helpers/validateAppConfig';
import configureStore from 'state/configureStore';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Results from 'pages/Results';
import DetailsPage from 'pages/DetailsPage';

import 'resources/styles/global.scss';

// import App from 'pages/App';

validateAppConfig();

function bootstrap() {
  if (window.name === '_auth') {
    // if this is an OAuth redirect window, deal with the OAuth response but
    // don't render the app.
    return handleImplicitRedirect(window.location.hash, window.opener);
  }

  const store = configureStore();

  render(
    <Provider store={store}>
      {/* <App /> */}
      <Router>
        <Route path="/results" component={Results} />
        <Route path="/details/:id" component={DetailsPage} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

bootstrap();
