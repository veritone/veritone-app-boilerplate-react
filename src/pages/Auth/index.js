import React from 'react';
import { OAuthLoginButton } from 'veritone-widgets';

const Auth = () => (
  <div>
    <OAuthLoginButton
      clientId="f728c059-026f-4ba0-b5c2-7fb40b5121c4"
      redirectUri={window.origin}
    />
    This is the auth page
  </div>
);

export default Auth;
