import {
  select,
  spawn,
  take,
  takeLatest,
  put,
  all,
  fork
} from 'redux-saga/effects';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated }
} = modules;

import {
  selectRoutesMap,
  selectRouteType,
  ROUTE_FORBIDDEN
} from 'modules/routing';

// setup sagas on application boot
export function* watchRouteSagas() {
  const routesMap = yield select(selectRoutesMap);
  const initialRoute = yield select(selectRouteType);

  // run sagas for initial route
  if (routesMap[initialRoute].saga) {
    // todo: do these need to be explicitly canceled when routes exit?
    yield spawn(routesMap[initialRoute].saga);
  }

  // watch routing actions and spawn related sagas as needed
  while (true) {
    const { type } = yield take(Object.keys(routesMap));

    if (routesMap[type].saga) {
      yield spawn(routesMap[type].saga);
    }
  }
}

function* redirectOnApiAuthErrors() {
  const forbiddenStatusCodes = [401, 403];

  yield takeLatest(
    ({ payload: { name, status } = {} } = {}) =>
      name === 'ApiError' && forbiddenStatusCodes.includes(status),
    function*() {
      if (yield select(userIsAuthenticated)) { // ignore if user is not logged in
        yield put(redirect({ type: ROUTE_FORBIDDEN }));
      }
    }
  );
}

export default function* routes() {
  yield all([fork(watchRouteSagas), fork(redirectOnApiAuthErrors)]);
}
