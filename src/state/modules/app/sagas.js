import {
  all,
  fork,
  takeLatest,
  put,
  call,
  race,
  take,
  select
} from 'redux-saga/effects';
import { find, isEmpty } from 'lodash';
import { modules } from 'veritone-redux-common';
const {
  user: {
    fetchUser,
    fetchEnabledApps,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_APPLICATIONS,
    FETCH_USER_APPLICATIONS_SUCCESS,
    FETCH_USER_APPLICATIONS_FAILURE
  },
  auth: { setOAuthToken, OAUTH_GRANT_FLOW_SUCCESS }
} = modules;

import {
  ROUTE_AUTH,
  selectRouteType,
  selectCurrentRoutePayload
} from '../routing';
import { BOOT, bootFinished, boot } from './';

function* getAppStartupDependencies() {
  // fetch stuff
  yield all([
    put(fetchEnabledApps())
    // ...other app dependencies
  ]);

  // wait for results
  const actions = [
    ...(yield race([
      take(FETCH_USER_APPLICATIONS_SUCCESS),
      take([
        // requestError
        a => a.type === FETCH_USER_APPLICATIONS && a.error,
        // api error
        FETCH_USER_APPLICATIONS_FAILURE
      ])
    ]))
    // ...etc
  ];

  // fixme -- refactor FETCH_USER/FETCH_USER_APPLICATIONS in redux-common to thunk style
  // and graphql, then replace this ugly take block and use put.resolve

  const error = find(actions, { error: true });
  if (error) {
    console.log('there was an error', error);
  }
}

function* watchAppBoot() {
  yield takeLatest(BOOT, function*() {
    const user = yield* fetchUserWithStoredToken();

    if (user) {
      yield* getAppStartupDependencies();
      yield put(bootFinished());
    } else {
      const routeType = yield select(selectRouteType);
      const routePayload = yield select(selectCurrentRoutePayload);

      if (routeType !== ROUTE_AUTH) {
        yield put({
          type: ROUTE_AUTH,
          payload: {
            query: {
              nextType: routeType,
              nextPayload: !isEmpty(routePayload)
                ? JSON.stringify(routePayload)
                : undefined
            }
          }
        });
      }

      yield put(bootFinished());

      // retry boot after logging in
      yield take(OAUTH_GRANT_FLOW_SUCCESS);
      yield put(boot());
    }
  });
}

function* fetchUserWithStoredToken() {
  const existingToken = yield call([localStorage, 'getItem'], 'OAuthToken');

  if (existingToken) {
    yield put(setOAuthToken(existingToken));
    yield put(fetchUser());

    const [successAction] = yield race([
      take(FETCH_USER_SUCCESS),
      take([a => a.type === FETCH_USER && a.error, FETCH_USER_FAILURE])
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
//
// function* fetchUserAfterSuccessfulAuth() {
//   yield takeLatest(OAUTH_GRANT_FLOW_SUCCESS, function*() {
//     yield put(fetchUser());
//   });
// }

export default function* auth() {
  yield all([
    fork(watchAppBoot),
    fork(storeTokenAfterSuccessfulAuth)
    // fork(fetchUserAfterSuccessfulAuth)
  ]);
}
