import React from 'react';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import RootRoute from '../../RootRoute';

// todo: add global stuff -- snackbar/modal targets, intercom button, ...
const App = () => (
  <div style={{ height: '100%' }}>
    <CssBaseline />
    <RootRoute />
  </div>
);

export default hot(module)(App);
