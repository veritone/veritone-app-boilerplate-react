const devEnv = require('veritone-dev-env');

module.exports = {
  ...devEnv.eslintReact,
  env: {
    ...devEnv.eslintReact.env,
    jest: true
  },
  globals: {
    ...devEnv.eslintReact.globals,
    module: true,
    process: true
  }
};
