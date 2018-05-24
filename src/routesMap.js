import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_AUTH,
  ROUTE_HOME,
  ROUTE_FORBIDDEN,
  ROUTE_EXAMPLE_TAKEOVER,
  ROUTE_EXAMPLE_TABS
} from 'modules/routing';

import { loadAuthPage } from 'modules/auth/saga';
import { loadExampleTabsPage } from 'modules/exampleTabs/saga';

export default {
  [ROUTE_AUTH]: {
    path: '/login',
    component: 'Auth',
    saga: loadAuthPage,
    requiresAuth: false
  },
  [ROUTE_HOME]: {
    path: '/',
    component: 'Home',
    requiresAuth: true
  },
  [ROUTE_EXAMPLE_TAKEOVER]: {
    // todo: takeover modals.
    // should not load the "lower" page.

    // should not render the lower page.

    // can we avoid a white flash when the lower route exits and the new one
    // enters/starts animating?

    // should navigate to the lower page when the modal is closed
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
          !['categories', 'tasks'].includes(
            action.payload.tab
          ),
        to: {
          type: ROUTE_EXAMPLE_TABS,
          payload: { tab: 'categories' }
        }
      }
    ]
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
