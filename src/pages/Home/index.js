import React from 'react';
// import {  } from 'prop-types';
import { AppContainer, TopBar } from 'veritone-react-common';
import { AppBar } from 'veritone-widgets';

import SideBar from 'components/SideBar';
import sideBarStyles from 'components/SideBar/styles.scss';
import styles from './styles.scss';

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#FBFBFB' }}>
        <AppBar appSwitcher profileMenu backgroundColor="#2b485c" />
        <TopBar appBarOffset />
        <SideBar />
        <AppContainer
          appBarOffset
          topBarOffset
          leftOffset={Number(sideBarStyles.sidebarwidth)}
        >
          <div className={styles.content}>
            {'home content test1234'.repeat(1000)}
          </div>
        </AppContainer>
      </div>
    );
  }
}
