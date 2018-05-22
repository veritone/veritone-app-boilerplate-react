import React from 'react';
// import {  } from 'prop-types';
import { AppContainer, TopBar } from 'veritone-react-common';
import { AppBar } from 'veritone-widgets';
import Grid from '@material-ui/core/Grid';
import Link from 'redux-first-router-link'

import SideBar from 'components/SideBar';
import sideBarStyles from 'components/SideBar/styles.scss';
import styles from './styles.scss';

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#FBFBFB' }}>
        <SideBar />
        <AppBar appSwitcher profileMenu backgroundColor="#2b485c" />
        <TopBar appBarOffset />
        <AppContainer
          appBarOffset
          topBarOffset
          leftOffset={Number(sideBarStyles.sidebarwidth)}
        >
          <div className={styles.content}>
            <Grid container>
              <Grid item xs={6}>
                <Link to={{ type: ''}}>Tabbed example</Link>
              </Grid>
              <Grid item xs={6}>
                {'home content test1234'.repeat(200)}
              </Grid>
            </Grid>
          </div>
        </AppContainer>
      </div>
    );
  }
}
