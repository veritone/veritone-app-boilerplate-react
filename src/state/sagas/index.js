import { fork, all } from 'redux-saga/effects';

import routeSaga from 'modules/routing/sagas';
import appSaga from 'modules/app/sagas';

// sagas that should run on all routes.
// define route-specific sagas on the routesMap
export default function* sagas(dispatch) {
  yield all([fork(routeSaga), fork(appSaga)]);
}
