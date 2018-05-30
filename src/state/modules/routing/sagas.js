import {
  select,
  take,
  all,
  fork,
  cancel,
  put,
  takeLatest
} from 'redux-saga/effects';
import { isEqual } from 'lodash';
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
import { BOOT_FINISHED, bootDidFinish } from 'state/modules/app';

// setup sagas on application boot
export function* watchRouteSagas() {
  const routesMap = yield select(selectRoutesMap);

  // watch routing actions -- spawn route sagas when the route mounts, and
  // cancel them when the route exits.
  let currentRouteTask;

  yield takeLatest(Object.keys(routesMap), function*(currentRoute) {
    const hasBooted = yield select(bootDidFinish);
    if (!hasBooted) {
      yield take(BOOT_FINISHED);
    }

    const userIsAuthed = yield select(userIsAuthenticated);
    if (routesMap[currentRoute.type].requiresAuth && !userIsAuthed) {
      // do not run sagas for inaccessible routes
      return;
    }

    const previousRoute = yield select(selectPreviousRoute);

    if (
      currentRoute.type === previousRoute.type &&
      isEqual(currentRoute.payload, previousRoute.payload)
      // todo: etc? query?
    ) {
      // no route change; leave sagas alone
      // fixme -- seems like this might not work. prev/current are never same?
      return;
    }

    if (currentRouteTask) {
      yield cancel(currentRouteTask);
    }

    if (routesMap[currentRoute.type].saga) {
      currentRouteTask = yield fork(routesMap[currentRoute.type].saga);
    }
  });
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
