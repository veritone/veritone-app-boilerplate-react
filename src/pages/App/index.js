import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RootRoute from '../../RootRoute';
import materialUITheme from '../../materialUITheme';
import { bootDidFail } from 'modules/app';
import RouteErrorScreen from 'components/RouteErrorScreen';

// todo: add global stuff -- snackbar/modal targets, intercom button, ...
@connect(state => ({
  bootDidFail: bootDidFail(state)
}))
class App extends Component {
  static propTypes = {
    bootDidFail: bool
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <CssBaseline />
        <MuiThemeProvider theme={materialUITheme}>
          {this.props.bootDidFail ? <RouteErrorScreen /> : <RootRoute />}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default hot(module)(App);
