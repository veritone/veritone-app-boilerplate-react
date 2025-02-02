import { all, fork, put } from 'redux-saga/effects';
import {
  loadResults
  //   getDetails
} from 'state/modules/results';

function* loadResultsInitinal() {
  yield put(loadResults());
}

function* loadDetails() {
  // yield put(getDetails());
}

export function* loadResultsSaga() {
  yield all([fork(loadResultsInitinal), fork(loadDetails)]);
}
