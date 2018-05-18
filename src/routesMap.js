import { NOT_FOUND } from 'redux-first-router';
import { ROUTE_AUTH, ROUTE_HOME, ROUTE_FORBIDDEN } from 'modules/routing';

import { loadAuthPage } from 'modules/auth/saga';

export default {
  [ROUTE_AUTH]: {
    path: '/login',
    component: 'Auth',
    saga: loadAuthPage
  },
  [ROUTE_HOME]: {
    path: '/',
    component: 'Home'
  },
  [NOT_FOUND]: {
    path: '/not-found',
    component: 'NotFound'
  },
  [ROUTE_FORBIDDEN]: {
    path: '/forbidden',
    component: 'Forbidden'
  }
};
