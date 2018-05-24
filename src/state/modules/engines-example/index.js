import callGraphQLApi from 'helpers/callGraphQLApi';

export const FETCH_ENGINE = 'request will be made to fetch an engine';
export const FETCH_ENGINE_SUCCESS = 'engine fetched successfully';
export const FETCH_ENGINE_FAILURE = 'engine fetch failed';

export const fetchEngine = id => async (dispatch, getState) => {
  const query = `
    query($id: ID!) {
      result: engine(id: $id) {
        engineId: id
        engineName: name
      }
    }
  `;

  return await callGraphQLApi({
    actions: [FETCH_ENGINE, FETCH_ENGINE_SUCCESS, FETCH_ENGINE_FAILURE],
    dispatch,
    getState,
    query,
    variables: { id }
  });
};
