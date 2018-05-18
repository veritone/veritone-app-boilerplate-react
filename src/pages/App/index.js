import React from 'react';
import { hot } from 'react-hot-loader';
import RootRoute from '../../RootRoute';
// todo: add global stuff -- snackbar/modal targets, intercom button, ...

const App = () => (
  <div style={{ height: '100%' }}>
    <RootRoute />
  </div>
);

export default hot(module)(App);
