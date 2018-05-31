import React from 'react';
import universal from 'react-universal-component';
import { connect } from 'react-redux';
import { string, bool, objectOf, any } from 'prop-types';
import { modules } from 'veritone-redux-common';
const {
  user: { userIsAuthenticated }
} = modules;
import RouteLoadingScreen from 'components/RouteLoadingScreen';
import RouteErrorScreen from 'components/RouteErrorScreen';
import { selectRoutesMap, selectRouteType } from 'modules/routing';
import { bootDidFinish } from 'state/modules/app';

const RootRoute = ({
  pageComponent,
  isLoading = false,
  isPermittedToRenderCurrentPage = false,
  currentRoute
}) =>
  isPermittedToRenderCurrentPage && (
    <UniversalComponent
      page={pageComponent}
      isLoading={isLoading}
      currentRoute={currentRoute}
    />
  );

RootRoute.propTypes = {
  pageComponent: string.isRequired,
  isLoading: bool,
  isPermittedToRenderCurrentPage: bool,
  currentRoute: objectOf(any).isRequired
};

const UniversalComponent = universal(props => import(`pages/${props.page}`), {
  minDelay: 500,
  chunkName: props => props.page,
  loading: <RouteLoadingScreen />,
  error: <RouteErrorScreen />,
  onError: (...error) => console.log(error)
});

export default connect(state => {
  const routesMap = selectRoutesMap(state);
  const routeType = selectRouteType(state);
  const currentRoute = routesMap[routeType];

  return {
    currentRoute,
    isPermittedToRenderCurrentPage:
      !currentRoute.requiresAuth || userIsAuthenticated(state),
    pageComponent: currentRoute.component,
    // in addition to showing the loading screen as chunks load,
    // we render it until initial app bootup finishes
    isLoading: !bootDidFinish(state)
  };
})(RootRoute);
