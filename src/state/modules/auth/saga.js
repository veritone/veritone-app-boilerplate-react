import { all, fork, takeLatest, put, select } from 'redux-saga/effects';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated, FETCH_USER_SUCCESS }
} = modules;

import {
  selectRouteType,
  ROUTE_AUTH,
  ROUTE_HOME
} from '../routing';

function* redirectAwayFromAuthPageIfAlreadyAuthenticated() {
  yield takeLatest(ROUTE_AUTH, function*() {
    if (yield select(userIsAuthenticated)) {
      yield put(redirect({ type: ROUTE_HOME }));
    }
  });
}

function* redirectAwayFromAuthPageAfterUserLogin() {
  yield takeLatest(FETCH_USER_SUCCESS, function*() {
    const routeType = yield select(selectRouteType);

    if (routeType === ROUTE_AUTH) {
      yield put(redirect({ type: ROUTE_HOME }));
    }
  });
}

export function* loadAuthPage() {
  yield all([
    fork(redirectAwayFromAuthPageIfAlreadyAuthenticated),
    fork(redirectAwayFromAuthPageAfterUserLogin)
  ]);
}
