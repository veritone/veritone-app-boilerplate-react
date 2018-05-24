// * * * * * * * *
// Provides app config from the redux store to a component through props.appConfig
// @withAppConfig
// class MyComponent extends React.Component {
//   myConfigNeedingHandler() { const { appConfig } = this.props; }
// * * * * * * * *

import React from 'react';
import { connect } from 'react-redux';

import { modules } from 'veritone-redux-common';
import { objectOf, any } from 'prop-types';
import getDisplayName from 'recompose/getDisplayName'

const {
  config: { getConfig }
} = modules;

const withAppConfig = WrappedComponent => {
  @connect(state => ({ appConfig: getConfig(state) }))
  class WrappedWithAppConfig extends React.PureComponent {
    static displayName = `WrappedWithAppConfig(${getDisplayName(
      WrappedComponent
    )})`;

    static propTypes = {
      appConfig: objectOf(any)
    };

    static defaultProps = {
      appConfig: {}
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WrappedWithAppConfig;
};

export default withAppConfig;
