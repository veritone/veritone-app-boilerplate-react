import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { OAuthLoginButton } from 'veritone-widgets';
import { AppContainer } from 'veritone-react-common';
import { modules } from 'veritone-redux-common';
import styles from './styles.scss';

const {
  config: { getConfig },
  auth: { selectOAuthError }
} = modules;

const errorMessages = {
  unauthorized_client: 'Your account does not have access to this application.'
};

const genericErrorMessage = error =>
  `There was an error while trying to authenticate: ${error}.`;

const Auth = ({ OAuthClientID, OAuthErrorCode, OAuthErrorDescription }) => (
  <AppContainer>
    <div className={styles.container}>
      {OAuthErrorCode &&
        (errorMessages[OAuthErrorCode] ||
          genericErrorMessage(OAuthErrorDescription))}
      <OAuthLoginButton clientId={OAuthClientID} redirectUri={window.origin} />
    </div>
  </AppContainer>
);

Auth.propTypes = {
  OAuthClientID: string.isRequired,
  OAuthErrorCode: string,
  OAuthErrorDescription: string
};

export default connect(state => {
  const error = selectOAuthError(state);
  return {
    OAuthClientID: getConfig(state).OAuthClientID,
    OAuthErrorCode: error.code,
    OAuthErrorDescription: error.description
      ? window.unescape(error.description)
      : null
  };
})(Auth);
