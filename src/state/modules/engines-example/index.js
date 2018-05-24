import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;
import callGraphQLApi from '~helpers/callGraphQLApi';
import { without, union } from 'lodash';
import { set } from 'lodash/fp';

export const FETCH_ENGINE = 'request to fetch an engine';
export const FETCH_ENGINE_SUCCESS = 'engine fetched successfully';
export const FETCH_ENGINE_FAILURE = 'engine fetch failed';

export const FETCH_ENGINE_CATEGORIES = `request to fetch the list of engine categories`;
export const FETCH_ENGINE_CATEGORIES_SUCCESS =
  'engine categories fetched successfully';
export const FETCH_ENGINE_CATEGORIES_FAILURE = 'engine categories fetch failed';

// fixme -- use some generic reducer to handle all this boilerplate,

const defaultState = {
  fetchingEngines: [],
  failedFetchingEngines: [],
  enginesById: {},
  fetchingEngineCategories: false,
  failedFetchingEngineCategories: false,
  engineCategories: []
};

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
  }),
  [FETCH_ENGINE_CATEGORIES]: (state, action) => ({
    ...state,
    fetchingEngineCategories: true,
    failedFetchingEngineCategories: false
  }),
  [FETCH_ENGINE_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    engineCategories: action.payload.engineCategories.records,
    fetchingEngineCategories: false,
    failedFetchingEngineCategories: false
  }),
  [FETCH_ENGINE_CATEGORIES_FAILURE]: state => ({
    ...state,
    fetchingEngineCategories: false,
    failedFetchingEngineCategories: true
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
    query,
    variables: { id },
    bailout: state => !!selectEngine(state, id),
    dispatch,
    getState
  });
};

export const fetchEngineCategories = ({ type } = {}) => async (
  dispatch,
  getState
) => {
  const query = `
    query($type: String) {
      engineCategories(type: $type) {
        records{
          id
          name
          type {
            name
            description
          }
          iconClass
        }
      }
    }`;

  return await callGraphQLApi({
    actionTypes: [
      FETCH_ENGINE_CATEGORIES,
      FETCH_ENGINE_CATEGORIES_SUCCESS,
      FETCH_ENGINE_CATEGORIES_FAILURE
    ],
    query,
    variables: { type },
    dispatch,
    getState,
    bailout: (state) => engineCategoriesAreLoading(state)
  });
};

export const selectEngine = (state, id) => local(state).enginesById[id];
export const engineIsLoading = (state, id) =>
  local(state).fetchingEngines.includes(id);
export const engineFailedToFetch = (state, id) =>
  local(state).failedFetchingEngines.includes(id);

export const selectEngineCategories = state => local(state).engineCategories;
export const engineCategoriesAreLoading = state =>
  local(state).fetchingEngineCategories;
export const engineCategoriesFailedToFetch = state =>
  local(state).failedFetchingEngineCategories;
