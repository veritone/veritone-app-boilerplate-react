import { fork, all } from 'redux-saga/effects';

import routeSaga from 'modules/routing/sagas';

// sagas that should run on all routes.
// define route-specific sagas on the routesMap
export default function* sagas(dispatch) {
  yield all([fork(routeSaga)]);
}
