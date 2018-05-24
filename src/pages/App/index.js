import React from 'react';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RootRoute from '../../RootRoute';
import materialUITheme from '../../materialUITheme';

// todo: add global stuff -- snackbar/modal targets, intercom button, ...
const App = () => (
  <div style={{ height: '100%' }}>
    <CssBaseline />
    <MuiThemeProvider theme={materialUITheme}>
      <RootRoute />
    </MuiThemeProvider>
  </div>
);

export default hot(module)(App);
