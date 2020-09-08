/* eslint-disable promise/always-return */
import { helpers } from 'veritone-redux-common';
import axios from 'axios';
const { createReducer } = helpers;

export const ADD_FETCHED_DATA = 'ADD_FETCHED_DATA';
export const ADD_DETAILS_DATA = 'ADD_DETAILS_DATA';

const defaultState = {
  results: []
};

const reducer = createReducer(defaultState, {
  [ADD_FETCHED_DATA]: (state, action) => ({
    ...state,
    results: action.payload.list,
    loadedData: false
  }),
  [ADD_DETAILS_DATA]: (state, action) => ({
    ...state,
    resultData: action.payload.list
  })
});

export const loadResults = () => {
  return dispatch => {
    return axios
      .get('http://marketplace.local.veritone.com/marketplace/getApps')
      .then(response => {
        return response.data;
      })
      .then(data => {
        dispatch({
          type: ADD_FETCHED_DATA,
          payload: data
        });
      })
      .catch(error => {
        throw error;
      });
  };
};

export default reducer;
export const namespace = 'results';
