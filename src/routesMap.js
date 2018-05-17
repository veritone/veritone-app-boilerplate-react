import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_HOME,
  ROUTE_FORBIDDEN
} from 'modules/routing';

// todo: add example using saga key, see dora modules/search/saga

export default {
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
