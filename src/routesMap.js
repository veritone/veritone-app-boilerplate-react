import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_AUTH,
  ROUTE_HOME,
  ROUTE_FORBIDDEN,
  ROUTE_EXAMPLE_TABS
} from 'modules/routing';

import { loadAuthPage } from 'modules/auth/saga';

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
  [ROUTE_EXAMPLE_TABS]: {
    path: '/tabs',
    component: 'ExampleTabs'
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
