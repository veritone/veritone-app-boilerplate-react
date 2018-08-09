import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { AppBar as LibAppBar } from 'veritone-widgets';
import { modules } from 'veritone-redux-common';

const {
  user: { logout }
} = modules;

const AppBar = ({ onLogout }) => (
  <LibAppBar
    appSwitcher
    profileMenu
    backgroundColor="#2b485c"
    onLogout={onLogout}
  />
);

AppBar.propTypes = {
  onLogout: func.isRequired
};

export default connect(
  null,
  { onLogout: logout }
)(AppBar);
