import { select, take, all, fork, cancel } from 'redux-saga/effects';

import {
  selectRoutesMap,
  selectRouteType,
  selectPreviousRoute
} from 'modules/routing';

// setup sagas on application boot
export function* watchRouteSagas() {
  const routesMap = yield select(selectRoutesMap);
  const initialRoute = yield select(selectRouteType);

  // run sagas for initial route
  let initialRouteTask;
  if (routesMap[initialRoute].saga) {
    initialRouteTask = yield fork(routesMap[initialRoute].saga);
  }

  // watch routing actions -- spawn route sagas when the route mounts, and
  // cancel them when the route exits.
  let currentRouteTask;
  while (true) {
    const { type } = yield take(Object.keys(routesMap));
    const { type: previousType } = yield select(selectPreviousRoute);

    if (type === previousType) {
      // no route change; leave sagas alone
      return;
    }

    if (initialRouteTask && !initialRouteTask.isCancelled()) {
      yield cancel(initialRouteTask);
    }

    if (currentRouteTask) {
      yield cancel(currentRouteTask);
    }

    if (routesMap[type].saga) {
      currentRouteTask = yield fork(routesMap[type].saga);
    }
  }
}

export default function* routes() {
  yield all([fork(watchRouteSagas)]);
}
