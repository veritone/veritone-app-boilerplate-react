// import { NOT_FOUND } from 'redux-first-router'
// import { helpers } from 'veritone-redux-common'
// const { createReducer } = helpers;

export const ROUTE_HOME = 'route/ROUTE_HOME';
export const ROUTE_FORBIDDEN = 'route/ROUTE_FORBIDDEN';

// export const refreshRoute = () => (dispatch, getState) => {
//   const currentLocation = getState().location;
//
//   dispatch({
//     type: currentLocation.type,
//     payload: currentLocation.payload,
//     meta: {
//       query: currentLocation.query
//     }
//   });
// };

export const selectRouteType = state => state.location.type;
export const selectRoutesMap = state => state.location.routesMap;
