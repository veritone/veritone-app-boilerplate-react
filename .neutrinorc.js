const merge = require('babel-merge');
const path = require('path');
const fs = require('fs');
const { pick, without, find } = require('lodash');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

const processEnv = process.env.environment;
const deployedConfigPath = `./config-${process.env.environment}.json`;
const localConfigPath = './config.json';
const isDeployed = processEnv && fs.existsSync(deployedConfigPath);

const appConfig = require(isDeployed ? deployedConfigPath : localConfigPath);
const safeConfigKeys = require('./configWhitelist.json');

const extraBabelPlugins = [
  'babel-plugin-transform-decorators-legacy',
  'babel-plugin-lodash',
  'babel-plugin-date-fns',
  'babel-plugin-universal-import'
].map(require.resolve);

const safeConfig = pick(appConfig, safeConfigKeys);
module.exports = {
  options: {
    tests: 'src'
  },
  use: [
    [
      '@neutrinojs/react',
      {
        minify: {
          babel: false
        },
        html: {
          title: 'Veritone App Boilerplate',
          links: [
            {
              href:
                'https://static.veritone.com/assets/favicon/apple-touch-icon.png',
              rel: 'apple-touch-icon',
              sizes: '180x180'
            },
            {
              href:
                'https://static.veritone.com/assets/favicon/favicon-32x32.png',
              rel: 'icon',
              sizes: '32x32',
              type: 'image/png'
            },
            {
              href:
                'https://static.veritone.com/assets/favicon/favicon-16x16.png',
              rel: 'icon',
              sizes: '16x16',
              type: 'image/png'
            },
            {
              href:
                'https://static.veritone.com/assets/favicon/safari-pinned-tab.svg',
              rel: 'mask-icon',
              color: '#597cb1'
            },
            {
              href: 'https://static.veritone.com/assets/favicon/favicon.ico',
              rel: 'shortcut icon',
              type: 'image/x-icon'
            },
            {
              href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
              rel: 'stylesheet'
            }
          ],
          window: { config: safeConfig }
        },
        devServer: {
          public: appConfig.useOAuthGrant ? 'localhost' : 'local.veritone.com',
          // open: true, // open browser window when server starts
          port: 3001,
          publicPath: '/'
        },
        minify: {
          babel: false
        },
        style: {
          modules: true,
          test: /\.(css|scss)$/,
          modulesTest: /\.scss$/,
          loaders: [
            {
              loader: 'sass-loader',
              useId: 'sass',
              options: {
                includePaths: [
                  path.resolve(__dirname, './src'),
                  path.resolve(__dirname, './resources')
                ]
              }
            }
          ]
        }
      }
    ],

    [
      '@neutrinojs/jest',
      {
        setupFiles: [
          path.resolve('./test/testSuitePolyfills.js'),
          path.resolve('./test/configureEnzyme.js')
        ],
        moduleNameMapper: {
          '^resources(.*)$': '<rootDir>/resources$1',
          '^components(.*)$': '<rootDir>/src/components$1',
          '^pages(.*)$': '<rootDir>/src/pages$1',
          '^state(.*)$': '<rootDir>/src/state$1',
          '^modules(.*)$': '<rootDir>/src/state/modules$1',
          '^sagas(.*)$': '<rootDir>/src/state/sagas$1',
          '^~helpers(.*)$': '<rootDir>/src/helpers$1',
          '^~util(.*)$': '<rootDir>/src/util$1',
          '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/__mocks__/fileMock.js',
          '\\.(css|scss)$': 'identity-obj-proxy'
        }
      }
    ],
    process.env.NODE_ENV === 'production'
      ? neutrino => neutrino.config.plugin('minify').use(UglifyjsPlugin)
      : null,
    neutrino => neutrino.config.output.publicPath('/'),

    neutrino =>
      neutrino.config.module
        .rule('compile')
        .use('babel')
        .tap(options => ({
          ...options,
          plugins: [
            'react-hot-loader/babel',
            ...extraBabelPlugins,
            // hack: remove hot loader v3 from preset-react so we can use the
            // v4 plugin instead
            ...without(
              options.plugins,
              find(options.plugins, val =>
                val.includes('react-hot-loader/babel.js')
              )
            )
          ]
        })),
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
        .set('~helpers', path.join(__dirname, 'src/helpers'))
        .set('~util', path.join(__dirname, 'src/util')),

    neutrino => neutrino.config.devtool('cheap-module-source-map')
  ]
};
