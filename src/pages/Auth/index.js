import React from 'react';
import { OAuthLoginButton } from 'veritone-widgets';
import { AppContainer } from 'veritone-react-common';
import { string, shape } from 'prop-types';
import withAppConfig from '~helpers/withAppConfig';

const Auth = ({ appConfig }) => (
  <AppContainer>
    <OAuthLoginButton
      clientId={appConfig.OAuthClientID}
      redirectUri={window.origin}
    />
  </AppContainer>
);

Auth.propTypes = {
  appConfig: shape({
    OAuthClientID: string.isRequired
  }).isRequired
};

export default withAppConfig(Auth);
