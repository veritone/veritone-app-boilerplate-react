import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import thunk from 'redux-thunk';
import { modules } from 'veritone-redux-common';

// imports for router
import { connectRoutes } from 'redux-first-router';
import routesMap from '../routesMap';

// redux sagas, reducers, actions
const { user: { fetchUser, fetchEnabledApps, fetchingFailed } } = modules;
const { config: { getConfig } } = modules;
import sagas from './sagas';
import composeReducers from './rootReducer';

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
  initialDispatch
} = connectRoutes(routesMap, {
  querySerializer: queryString,
  initialDispatch: false
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeMiddlewares = applyMiddleware(
  routerMiddleware,
  apiMiddleware,
  sagaMiddleware,
  thunk
);

export const store = createStore(
  composeReducers({ location: routerReducer }),
  composeEnhancers(routerEnhancer, composeMiddlewares)
);

store
  .dispatch(fetchUser())
  .then(() => {
    // fixme -- implement in terms of oauth
    const state = store.getState();

    if (fetchingFailed(state)) {
      const config = getConfig(state);
      const loginRoot = config.pageUris.loginPageUri;
      window.location = `${loginRoot}?redirect=${window.location.href}`;
      throw new Error('redirecting to login');
    }

    return true;
  })
  .then(initialDispatch)
  .then(() => sagaMiddleware.run(sagas))

  // fixme -- more structure for base setup?
  // ie. store.dispatch(setUpUser)
  .then(() => store.dispatch(fetchEnabledApps()));
