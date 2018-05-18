import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { modules } from 'veritone-redux-common';
const { auth, user, uiState, config } = modules;
const { namespace: userNamespace, reducer: userReducer } = user;
const { namespace: authNamespace, reducer: authReducer } = auth;

import appReducer, { namespace as appNamespace } from 'modules/app';

export default extraReducers =>
  combineReducers({
    form: formReducer,
    [uiState.namespace]: uiState.reducer,
    [authNamespace]: authReducer,
    [appNamespace]: appReducer,
    [userNamespace]: userReducer,
    [config.namespace]: (state = window.config) => state, // fixme?
    // [searchNamespace]: searchReducer,
    ...extraReducers
  });
