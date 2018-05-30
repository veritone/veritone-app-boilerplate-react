import { all, fork, takeLatest, put, select } from 'redux-saga/effects';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated, FETCH_USER_SUCCESS }
} = modules;

import {
  selectRouteType,
  selectCurrentRoutePayload,
  ROUTE_AUTH,
  ROUTE_HOME
} from 'state/modules/routing';

function* redirectAwayIfAlreadyAuthenticated() {
  if (yield select(userIsAuthenticated)) {
    yield put({ type: ROUTE_HOME });
  }
}

function* redirectAwayAfterUserLogin() {
  yield takeLatest(FETCH_USER_SUCCESS, function*() {
    const routeType = yield select(selectRouteType);
    const currentRoutePayload = yield select(selectCurrentRoutePayload);
    const { nextType, nextPayload } = currentRoutePayload.query || {};

    if (routeType === ROUTE_AUTH) {
      // look for redirect information in the query string, and send the user
      // to their original destination if it exists.
      const redirectType = nextType || ROUTE_HOME;
      let parsedNextPayload;
      try {
        parsedNextPayload = JSON.parse(nextPayload);
      } catch (e) {
        /* */
      }

      yield put({ type: redirectType, payload: parsedNextPayload });
    }
  });
}

export function* loadAuthPage() {
  yield all([
    fork(redirectAwayIfAlreadyAuthenticated),
    fork(redirectAwayAfterUserLogin)
  ]);
}
