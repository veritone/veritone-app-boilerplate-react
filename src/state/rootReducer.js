import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { modules } from 'veritone-redux-common';
const { auth, user, uiState, config } = modules;
const { namespace: userNamespace, reducer: userReducer } = user;
const { namespace: authNamespace, reducer: authReducer } = auth;

import appReducer, { namespace as appNamespace } from 'modules/app';
import resultsReducer, { namespace as resultsspace } from 'modules/results';
import resultReducer, { namespace as resultspace } from 'modules/result';
import enginesExampleReducer, {
  namespace as enginesExampleNamespace
} from 'modules/engines-example';

export default extraReducers =>
  combineReducers({
    form: formReducer,
    [uiState.namespace]: uiState.reducer,
    [authNamespace]: authReducer,
    [appNamespace]: appReducer,
    [resultsspace]: resultsReducer,
    [resultspace]: resultReducer,
    [enginesExampleNamespace]: enginesExampleReducer,
    [userNamespace]: userReducer,
    [config.namespace]: (state = window.config) => state, // fixme?
    // [searchNamespace]: searchReducer,
    ...extraReducers
  });
