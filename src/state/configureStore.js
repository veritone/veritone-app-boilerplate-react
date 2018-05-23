import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { redirect } from 'redux-first-router';
import createSagaMiddleware from 'redux-saga';
import queryString from 'query-string';
import thunk from 'redux-thunk';
import { find } from 'lodash';

// imports for router
import { connectRoutes } from 'redux-first-router';
import routesMap from '../routesMap';

// redux sagas, reducers, actions
import sagas from './sagas';
import composeReducers from './rootReducer';
import { boot } from 'modules/app';

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
  initialDispatch
} = connectRoutes(routesMap, {
  querySerializer: queryString,
  initialDispatch: false,
  onBeforeChange: (dispatch, getState, { action }) => {
    const routeDefinition = routesMap[action.type];

    if (routeDefinition && routeDefinition.redirects) {
      const matchedRedirect = find(
        routeDefinition.redirects,
        ({ test }) => !!test(getState, action)
      );

      matchedRedirect && dispatch(redirect(matchedRedirect.to));
    }
  }
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeMiddlewares = applyMiddleware(
  routerMiddleware,
  apiMiddleware,
  sagaMiddleware,
  thunk
);

export default function configureStore() {
  const store = createStore(
    composeReducers({ location: routerReducer }),
    composeEnhancers(routerEnhancer, composeMiddlewares)
  );

  sagaMiddleware.run(sagas);
  initialDispatch();
  store.dispatch(boot());

  return store;
}
