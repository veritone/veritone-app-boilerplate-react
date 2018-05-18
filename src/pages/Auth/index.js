import React from 'react';
import { OAuthLoginButton } from 'veritone-widgets';
import { AppContainer } from 'veritone-react-common';

const Auth = () => (
  <AppContainer>
    <OAuthLoginButton
      clientId="f728c059-026f-4ba0-b5c2-7fb40b5121c4"
      redirectUri={window.origin}
    />
  </AppContainer>
);

export default Auth;
