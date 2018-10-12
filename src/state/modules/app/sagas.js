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
import { find, isEmpty, get } from 'lodash';
import { modules } from 'veritone-redux-common';
const {
  user: {
    selectUser,
    fetchUser,
    fetchEnabledApps,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_APPLICATIONS,
    FETCH_USER_APPLICATIONS_SUCCESS,
    FETCH_USER_APPLICATIONS_FAILURE,
    LOGOUT_SUCCESS
  },
  auth: { setOAuthToken, OAUTH_GRANT_FLOW_SUCCESS },
  config: { getConfig }
} = modules;

import importPendo from 'resources/vendor/js/pendo';

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
    const config = yield select(getConfig);
    const user = yield* fetchUserWithStoredTokenOrCookie();

    if (user) {
      // login success with stored credentials or cookie
      yield* getAppStartupDependencies();
      yield put(bootFinished());
    } else {
      if (config.useOAuthGrant) {
        yield* redirectAndAwaitOAuthGrant();
      } else {
        yield* redirectToVeritoneInternalLogin();
      }
    }
  });
}

function* redirectAndAwaitOAuthGrant() {
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

function* redirectToVeritoneInternalLogin() {
  const config = yield select(getConfig);

  window.location = `${config.loginRoute}/?redirect=${window.location.href}`;
}

function* fetchUserWithStoredTokenOrCookie() {
  const existingOAuthToken = yield call(
    [localStorage, 'getItem'],
    'OAuthToken'
  );

  if (existingOAuthToken) {
    yield put(setOAuthToken(existingOAuthToken));
  }

  yield put(fetchUser());

  const [successAction] = yield race([
    take(FETCH_USER_SUCCESS),
    take([a => a.type === FETCH_USER && a.error, FETCH_USER_FAILURE])
  ]);

  // todo: this could differentiate between auth error (expired token) and failure
  // (api error)
  return successAction ? successAction.payload : false;
}

function* storeTokenAfterSuccessfulOAuthGrant() {
  yield takeLatest(OAUTH_GRANT_FLOW_SUCCESS, function*({
    payload: { OAuthToken }
  }) {
    yield call([localStorage, 'setItem'], 'OAuthToken', OAuthToken);
  });
}

function* clearStoredTokenAfterLogout() {
  yield takeLatest(LOGOUT_SUCCESS, function*() {
    yield call([localStorage, 'removeItem'], 'OAuthToken');
    yield call([location, 'reload']);
  });
}

function* initializePendoAfterUserLogin() {
  const config = yield select(getConfig);

  if (!config.pendoKey) {
    return;
  }

  yield take(FETCH_USER_SUCCESS);
  const user = yield select(selectUser);

  importPendo(config.pendoKey);

  window.pendo.initialize({
    visitor: {
      id: user.userId,
      email: user.userName
    },
    account: {
      id: get(user, 'groups[0].groupId'),
      groupname: get(user, 'groups[0].groupName'),
      organizationId: user.organization.organizationId,
      organizationName: user.organization.organizationName
    }
  });
}

export default function* auth() {
  yield all([
    fork(watchAppBoot),
    fork(storeTokenAfterSuccessfulOAuthGrant),
    fork(clearStoredTokenAfterLogout),
    fork(initializePendoAfterUserLogin)
  ]);
}
