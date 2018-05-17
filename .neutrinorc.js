const merge = require('babel-merge');
const path = require('path');
const { pick } = require('lodash');

const devConfig = require('./server.json');
const safeConfigKeys = require('./configWhitelist.json');

const extraBabelPlugins = [
  'babel-plugin-transform-decorators-legacy',
  'babel-plugin-lodash',
  'babel-plugin-date-fns',
  'babel-plugin-universal-import',
  'react-hot-loader/babel'
].map(require.resolve);

const safeConfig = pick(devConfig, safeConfigKeys);
module.exports = {
  options: {
    tests: 'src'
  },
  use: [
    [
      '@neutrinojs/react',
      {
        html: { title: 'Face Match', window: { config: safeConfig } },
        devServer: {
          public: 'local.facematch.com',
          // open: true, // open browser window when server starts
          port: 3000,
          publicPath: '/'
        }
      }
    ],

    [
      'neutrino-middleware-styles-loader',
      {
        cssModules: true,
        extractCSS: true,
        sourceMap: true,
        minimize: true
      }
    ],

    [
      '@neutrinojs/jest',
      {
        setupFiles: [
          path.resolve('./test/testSuitePolyfills.js'),
          path.resolve('./test/configureEnzyme.js')
        ]
      }
    ],

    neutrino =>
      neutrino.config.module
        .rule('compile')
        .use('babel')
        .tap(options =>
          merge(
            {
              plugins: extraBabelPlugins,
              env: {
                development: {
                  plugins: extraBabelPlugins
                }
              }
            },
            options
          )
        ),

    neutrino =>
      neutrino.config.resolve.alias
        .set('redux-api-middleware', 'redux-api-middleware-fixed')

        .set('resources', path.join(__dirname, 'resources'))
        .set('components', path.join(__dirname, 'src/components'))
        .set('pages', path.join(__dirname, 'src/pages'))
        .set('state', path.join(__dirname, 'src/state'))
        .set('modules', path.join(__dirname, 'src/state/modules'))
        .set('sagas', path.join(__dirname, 'src/state/sagas'))
        // neutrino breaks if we try to alias "helpers" or "util" (try `yarn test`)
        .set('.helpers', path.join(__dirname, 'src/helpers'))
        .set('.util', path.join(__dirname, 'src/util')),

    neutrino => neutrino.config.devtool('cheap-module-source-map')
  ]
};
