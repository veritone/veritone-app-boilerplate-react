import { all, fork, put, select } from 'redux-saga/effects';
import { selectCurrentRoutePayload } from 'state/modules/routing';
import { loadResult } from 'state/modules/result';

function* loadResultInitinal() {
  let { id } = yield select(selectCurrentRoutePayload);
  console.log('here', id);
  yield put(loadResult(id));
}

export default function* loadResultSaga() {
  console.log('result saga');
  yield all([fork(loadResultInitinal)]);
}
