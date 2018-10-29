import { helpers } from 'veritone-redux-common';
const { createReducer } = helpers;

export const BOOT = 'boot saga: sequence all the stuff needed to start the app';
export const BOOT_FINISHED = 'boot saga finished';

const defaultState = {
  isBooting: false,
  bootDidFinish: false,
  bootDidFail: false
};
const reducer = createReducer(defaultState, {
  [BOOT]: state => ({
    ...state,
    isBooting: true,
    bootDidFinish: false,
    bootDidFail: false
  }),
  [BOOT_FINISHED]: (state, action) => ({
    ...state,
    isBooting: false,
    bootDidFinish: true,
    bootDidFail: !!action.payload.failed
  })
});

export default reducer;
export const namespace = 'app';

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options
});

export const bootFinished = ({ failed = false } = {}) => ({
  type: BOOT_FINISHED,
  payload: { failed }
});

export const isBooting = state => state.app.isBooting;
export const bootDidFinish = state => state.app.bootDidFinish;
export const bootDidFail = state => state.app.bootDidFail;
