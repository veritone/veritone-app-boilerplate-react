import {
  all,
  fork,
  takeLatest,
  put,
  call,
  race,
  take
} from 'redux-saga/effects';
import { noop } from 'lodash';
import { redirect } from 'redux-first-router';
import { modules } from 'veritone-redux-common';
const {
  user: { fetchUser, fetchEnabledApps, FETCH_USER_SUCCESS, FETCH_USER_FAILURE },
  auth: { setOAuthToken, OAUTH_GRANT_FLOW_SUCCESS }
} = modules;

import { ROUTE_AUTH } from '../routing';
import { BOOT, bootFinished } from './';

function* getAppStartupDependencies() {
  yield all([
    put(fetchEnabledApps())
    // ...other app dependencies
  ]);
}

function* watchAppBoot() {
  yield takeLatest(BOOT, function*({ payload: { onSuccess = noop } }) {
    const user = yield* fetchUserWithStoredToken();

    if (user) {
      yield* getAppStartupDependencies();
    } else {
      yield put(redirect({ type: ROUTE_AUTH }));
    }

    yield call(onSuccess);
    yield put(bootFinished);
  });
}

function* fetchUserWithStoredToken() {
  const existingToken = yield call([localStorage, 'getItem'], 'OAuthToken');

  if (existingToken) {
    yield put(setOAuthToken(existingToken));
    yield put(fetchUser());

    const [successAction] = yield race([
      take(FETCH_USER_SUCCESS),
      take(FETCH_USER_FAILURE)
    ]);

    // todo: this could differentiate between auth error (expired token) and failure
    // (api error)
    return successAction ? successAction.payload : false;
  }

  return false;
}

function* storeTokenAfterSuccessfulAuth() {
  yield takeLatest(OAUTH_GRANT_FLOW_SUCCESS, function*({
    payload: { OAuthToken }
  }) {
    yield call([localStorage, 'setItem'], 'OAuthToken', OAuthToken);
  });
}

export default function* auth() {
  yield all([fork(watchAppBoot, storeTokenAfterSuccessfulAuth)]);
}
