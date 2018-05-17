import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { modules } from 'veritone-redux-common';
const { user, uiState, config } = modules;
const { namespace: userNamespace, reducer: userReducer } = user;

// import searchReducer, { namespace as searchNamespace } from 'modules/search';

export default extraReducers =>
  combineReducers({
    form: formReducer,
    [uiState.namespace]: uiState.reducer,
    [userNamespace]: userReducer,
    [config.namespace]: (state = window.config) => state, // fixme?
    // [searchNamespace]: searchReducer,
    ...extraReducers
  });
