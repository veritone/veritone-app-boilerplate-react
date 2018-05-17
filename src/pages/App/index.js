import React from 'react';
import RootRoute from '../../RootRoute';

export default class AppContainer extends React.Component {
  static propTypes = {};

  render() {
    // todo: add global stuff -- snackbar/modal targets, intercom button, ...
    return (
      <div style={{ height: '100%' }}>
        <RootRoute />
      </div>
    );
  }
}
