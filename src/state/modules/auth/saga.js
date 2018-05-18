import { all, fork, takeLatest, put, select } from 'redux-saga/effects';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated }
} = modules;

import { ROUTE_AUTH, ROUTE_HOME } from '../routing';

function* redirectIfAlreadyAuthenticated() {
  yield takeLatest(ROUTE_AUTH, function*() {
    if (yield select(userIsAuthenticated)) {
      console.log('already logged in; redirecting')
      yield put(redirect({ type: ROUTE_HOME }));
    }
  });
}

export function* loadAuthPage() {
  yield all([fork(redirectIfAlreadyAuthenticated)]);
}
