import { NOT_FOUND } from 'redux-first-router';
import { ROUTE_AUTH, ROUTE_HOME, ROUTE_FORBIDDEN } from 'modules/routing';

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
