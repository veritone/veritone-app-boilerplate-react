import React from 'react';
import { bool } from 'prop-types';
import { AppContainer as LibAppContainer } from 'veritone-react-common';
import sideBarStyles from 'components/SideBar/styles.scss';

const AppContainer = ({ sideBarOffset, ...props }) => (
  <LibAppContainer
    {...props}
    leftOffset={sideBarOffset ? Number(sideBarStyles.sidebarwidth) : 0}
  />
);
AppContainer.propTypes = {
  sideBarOffset: bool
};
export default AppContainer;
