import { all, fork, takeLatest, put, select } from 'redux-saga/effects';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated, FETCH_USER_SUCCESS }
} = modules;

import {
  selectRouteType,
  ROUTE_AUTH,
  ROUTE_FORBIDDEN,
  ROUTE_HOME
} from '../routing';

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

function* redirectAwayFromAuthPageIfAlreadyAuthenticated() {
  yield takeLatest(ROUTE_AUTH, function*() {
    if (yield select(userIsAuthenticated)) {
      console.log('already logged in; redirecting');
      yield put(redirect({ type: ROUTE_HOME }));
    }
  });
}

function* redirectAwayFromAuthPageAfterUserLogin() {
  yield takeLatest(FETCH_USER_SUCCESS, function*() {
    const routeType = yield select(selectRouteType);

    if (routeType === ROUTE_AUTH) {
      console.log('user logged in; redirecting');
      yield put(redirect({ type: ROUTE_HOME }));
    }
  });
}

export function* loadAuthPage() {
  yield all([
    fork(redirectToForbiddenRouteOnApiAuthErrors),
    fork(redirectAwayFromAuthPageIfAlreadyAuthenticated),
    fork(redirectAwayFromAuthPageAfterUserLogin)
  ]);
}
