import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;
import callGraphQLApi from '~helpers/callGraphQLApi';
import { without, union } from 'lodash';
import { set } from 'lodash/fp';

export const FETCH_ENGINE = 'request made to fetch an engine';
export const FETCH_ENGINE_SUCCESS = 'engine fetched successfully';
export const FETCH_ENGINE_FAILURE = 'engine fetch failed';

const defaultState = {
  fetchingEngines: [],
  failedFetchingEngines: [],
  enginesById: {}
};

// fixme -- use some generic reducer to handle all this boilerplate,
// with reducereducers
const reducer = createReducer(defaultState, {
  [FETCH_ENGINE]: (state, action) => ({
    ...state,
    fetchingEngines: union(state.fetchingEngines, [action.meta.variables.id]),
    failedFetchingEngines: without(
      state.fetchingEngines,
      action.meta.variables.id
    )
  }),
  [FETCH_ENGINE_SUCCESS]: (state, action) => ({
    ...set(
      `enginesById.${action.meta.variables.id}`,
      action.payload.engine,
      state
    ),
    fetchingEngines: without(state.fetchingEngines, action.meta.variables.id)
  }),
  [FETCH_ENGINE_FAILURE]: (state, action) => ({
    ...state,
    fetchingEngines: without(state.fetchingEngines, action.meta.variables.id),
    failedFetchingEngines: union(state.fetchingEngines, [
      action.meta.variables.id
    ])
  })
});

export default reducer;
export const namespace = 'engines-example';
export const local = state => state[namespace];

export const fetchEngine = id => async (dispatch, getState) => {
  const query = `
    query($id: ID!) {
      engine(id: $id) {
        engineId: id
        engineName: name
      }
    }
  `;

  return await callGraphQLApi({
    actionTypes: [FETCH_ENGINE, FETCH_ENGINE_SUCCESS, FETCH_ENGINE_FAILURE],
    dispatch,
    getState,
    query,
    variables: { id },
    bailout: state => !!selectEngine(state, id)
  });
};

export const selectEngine = (state, id) => local(state).enginesById[id];
export const engineIsLoading = (state, id) =>
  local(state).fetchingEngines.includes(id);
export const engineFailedToFetch = (state, id) =>
  local(state).failedFetchingEngines.includes(id);
