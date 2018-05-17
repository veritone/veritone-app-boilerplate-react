import React from 'react';
import universal from 'react-universal-component';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import RouteLoadingScreen from 'components/RouteLoadingScreen';
import RouteErrorScreen from 'components/RouteErrorScreen';
import { selectRoutesMap, selectRouteType } from 'modules/routing';

const RootRoute = ({ pageComponent }) => {
  return <UniversalComponent page={pageComponent} /*isLoading={isLoading}*/ />;
};

RootRoute.propTypes = {
  pageComponent: string.isRequired
};

const UniversalComponent = universal(props => import(`pages/${props.page}`), {
  minDelay: 500,
  chunkName: props => props.page,
  loading: <RouteLoadingScreen />,
  error: <RouteErrorScreen />,
  onError: (...error) => console.log(error)
});

export default connect(state => ({
  pageComponent: selectRoutesMap(state)[selectRouteType(state)].component
}))(RootRoute);
