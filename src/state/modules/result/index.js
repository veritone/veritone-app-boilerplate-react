/* eslint-disable promise/always-return */
import { helpers } from 'veritone-redux-common';
import axios from 'axios';
const { createReducer } = helpers; //callGraphQLApi

export const LOAD_DATA = 'LOAD_DATA';

const defaultState = {
  resultData: null
};

const reducer = createReducer(defaultState, {
  [LOAD_DATA]: (state, action) => ({
    ...state,
    resultData: action.payload
  })
});

export const loadResult = id => {
  return dispatch => {
    return axios
      .get(`http://marketplace.local.veritone.com/marketplace/details/${id}/1`)
      .then(response => {
        console.log('ttttttttt', response.data);
        return response.data;
      })
      .then(data => {
        dispatch({
          type: LOAD_DATA,
          payload: data
        });
      })
      .catch(error => {
        throw error;
      });
  };
};

export default reducer;
export const namespace = 'result';
