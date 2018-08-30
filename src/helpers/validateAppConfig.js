import { get, difference } from 'lodash';

const requiredConfigKeys = [
  'apiRoot',
  'switchAppRoute',
  'loginRoute',
  'graphQLEndpoint',
  get(window.config, 'useOAuthGrant') && 'OAuthClientID'
].filter(Boolean);

export default function validateAppConfig() {
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
}
