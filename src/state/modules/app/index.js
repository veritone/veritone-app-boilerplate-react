import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;

export const BOOT = 'boot saga: sequence all the stuff needed to start the app';
export const BOOT_FINISHED = 'boot saga finished';

const defaultState = {};
const reducer = createReducer(defaultState, {});

export default reducer;
export const namespace = 'app';

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options
});

export const bootFinished = () => ({
  type: BOOT_FINISHED
});
