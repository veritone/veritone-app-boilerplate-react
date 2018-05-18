import { fork, all } from 'redux-saga/effects';
import { modules } from 'veritone-redux-common';
const {
  auth: { authRootSaga }
} = modules;
import routeSaga from 'modules/routing/sagas';
import appSaga from 'modules/app/sagas';

// these are sagas that should run on *all* routes, at app startup.
// define route-specific sagas on the routesMap
export default function* sagas() {
  yield all([fork(routeSaga), fork(appSaga), fork(authRootSaga)]);
}
