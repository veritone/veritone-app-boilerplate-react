import React from 'react';
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

export default App;
