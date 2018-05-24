import { all, fork, put, select } from 'redux-saga/effects';
import { selectCurrentRoutePayload } from 'state/modules/routing';
import {
  fetchEngine,
  fetchEngineCategories
} from 'state/modules/engines-example';

function* loadRouteData() {
  const { tab } = yield select(selectCurrentRoutePayload);
  const tabLoader = {
    categories: loadCategoriesTabData,
    tasks: loadTasksTabData
  }[tab];

  yield all([loadSharedData(), tabLoader && tabLoader()]);
}

function* loadSharedData() {
  yield put(fetchEngine('18502331-1a02-4261-8350-9f36bbabf9cf'));
}

function* loadCategoriesTabData() {
  yield put(fetchEngineCategories());
}

function* loadTasksTabData() {
  // yield put(fetchEngineTasks());
}

export function* loadExampleTabsPage() {
  yield all([fork(loadRouteData)]);
}
