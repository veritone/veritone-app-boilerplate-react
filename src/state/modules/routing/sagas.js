import { select, take, all, fork, cancel, put, takeLatest } from 'redux-saga/effects';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated }
} = modules;

import {
  selectRoutesMap,
  // selectRouteType,
  selectPreviousRoute
} from 'modules/routing';
import { ROUTE_FORBIDDEN } from './';

// setup sagas on application boot
export function* watchRouteSagas() {
  const routesMap = yield select(selectRoutesMap);

  // watch routing actions -- spawn route sagas when the route mounts, and
  // cancel them when the route exits.
  let currentRouteTask;
  while (true) {
    const { type } = yield take(Object.keys(routesMap));
    const { type: previousType } = yield select(selectPreviousRoute);

    const userIsAuthed = yield select(userIsAuthenticated);
    if (routesMap[type].requiresAuth && !userIsAuthed) {
      // do not run sagas for inaccessible routes
      continue;
    }

    if (type === previousType) {
      // no route change; leave sagas alone
      continue;
    }

    if (currentRouteTask) {
      yield cancel(currentRouteTask);
    }

    if (routesMap[type].saga) {
      currentRouteTask = yield fork(routesMap[type].saga);
    }
  }
}

function* redirectToForbiddenRouteOnApiAuthErrors() {
  const forbiddenStatusCodes = [401, 403];

  yield takeLatest(
    ({ payload: { name, status } = {} } = {}) =>
      name === 'ApiError' && forbiddenStatusCodes.includes(status),
    function*() {
      if (yield select(userIsAuthenticated)) {
        // ignore if user is not logged in
        yield put(redirect({ type: ROUTE_FORBIDDEN }));
      }
    }
  );
}

export default function* routes() {
  yield all([
    fork(watchRouteSagas),
    fork(redirectToForbiddenRouteOnApiAuthErrors)
  ]);
}
