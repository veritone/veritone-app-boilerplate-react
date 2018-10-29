import { helpers } from 'veritone-redux-common';
const {
  createReducer,
  callGraphQLApi,
  handleApiCall,
  reduceReducers,
  fetchingStatus
} = helpers;

export const FETCH_ENGINE = 'request to fetch an engine';
export const FETCH_ENGINE_SUCCESS = 'engine fetched successfully';
export const FETCH_ENGINE_FAILURE = 'engine fetch failed';

export const FETCH_ENGINE_CATEGORIES = `request to fetch the list of engine categories`;
export const FETCH_ENGINE_CATEGORIES_SUCCESS =
  'engine categories fetched successfully';
export const FETCH_ENGINE_CATEGORIES_FAILURE = 'engine categories fetch failed';

export const namespace = 'engines-example';
export const local = state => state[namespace];

const {
  reducer: fetchEngineReducer,
  selectors: {
    fetchingStatus: fetchEngineFetchingStatus,
    fetchingFailureMessage: fetchEngineFailureMessage
  }
} = handleApiCall({
  types: [FETCH_ENGINE, FETCH_ENGINE_SUCCESS, FETCH_ENGINE_FAILURE],
  stateSelector: local
});

export { fetchEngineFetchingStatus, fetchEngineFailureMessage };
export const selectEngine = (state, id) => local(state).enginesById[id];

const {
  reducer: fetchEngineCategoriesReducer,
  selectors: {
    fetchingStatus: fetchEngineCategoriesFetchingStatus,
    fetchingFailureMessage: fetchEngineCategoriesFailureMessage
  }
} = handleApiCall({
  types: [
    FETCH_ENGINE_CATEGORIES,
    FETCH_ENGINE_CATEGORIES_SUCCESS,
    FETCH_ENGINE_CATEGORIES_FAILURE
  ],
  stateSelector: local
});

export {
  fetchEngineCategoriesFetchingStatus,
  fetchEngineCategoriesFailureMessage
};
export const selectEngineCategories = state => local(state).engineCategories;

const defaultState = {
  enginesById: {},
  engineCategories: []
};

const reducer = reduceReducers(
  fetchEngineReducer,
  fetchEngineCategoriesReducer,
  createReducer(defaultState, {
    [FETCH_ENGINE_SUCCESS]: (state, action) => ({
      ...state,
      enginesById: {
        ...state.enginesById,
        [action.meta.variables.id]: action.payload.engine
      }
    }),
    [FETCH_ENGINE_CATEGORIES_SUCCESS]: (state, action) => ({
      ...state,
      engineCategories: action.payload.engineCategories.records
    })
  })
);

export default reducer;

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
    getState,
    requestId: id
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
    bailout: state =>
      fetchEngineCategoriesFetchingStatus(state) === fetchingStatus.fetching
  });
};
