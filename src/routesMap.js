import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_HOME,
  ROUTE_FORBIDDEN,
  ROUTE_EXAMPLE_TAKEOVER,
  ROUTE_EXAMPLE_TABS,
  ROUTE_RESULTS,
  ROUTE_DETAILS
} from 'modules/routing';

// import { loadAuthPage } from 'modules/auth/saga';
import { loadExampleTabsPage } from 'modules/exampleTabs/saga';
import { loadResultsSaga } from 'modules/results/saga';
import loadResultSaga from 'modules/result/saga';
export default {
  // [ROUTE_AUTH]: {
  //   path: '/login',
  //   component: 'Auth',
  //   saga: loadAuthPage,
  //   requiresAuth: false
  // },
  [ROUTE_HOME]: {
    path: '/',
    component: 'Home',
    requiresAuth: true
  },
  [ROUTE_RESULTS]: {
    path: '/results',
    component: 'Results',
    saga: loadResultsSaga,
    requiresAuth: false
  },
  [ROUTE_DETAILS]: {
    path: '/details/:id',
    component: 'DetailsPage',
    saga: loadResultSaga,
    requiresAuth: false
  },
  [ROUTE_EXAMPLE_TAKEOVER]: {
    path: '/example-takeover',
    modalOver: ROUTE_HOME,
    component: 'ExampleTakeoverModal',
    requiresAuth: true
  },
  [ROUTE_EXAMPLE_TABS]: {
    path: '/tabs/:tab?',
    component: 'ExampleTabs',
    requiresAuth: true,
    saga: loadExampleTabsPage,
    redirects: [
      {
        test: (getState, action) =>
          // /tabs or /tabs/invalidTab
          !['categories', 'tasks'].includes(action.payload.tab),
        to: {
          type: ROUTE_EXAMPLE_TABS,
          payload: { tab: 'categories' }
        }
      }
    ],
    returnTo: {
      label: 'Home',
      route: { type: ROUTE_HOME }
    }
  },
  [NOT_FOUND]: {
    path: '/not-found',
    component: 'NotFound',
    requiresAuth: true
  },
  [ROUTE_FORBIDDEN]: {
    path: '/forbidden',
    component: 'Forbidden',
    requiresAuth: true
  }
};
