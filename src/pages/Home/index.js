import React from 'react';
// import {  } from 'prop-types';
import { AppFooter, AppContainer } from 'veritone-react-common';
import { AppBar } from 'veritone-widgets';
import styles from './styles.scss';

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#FBFBFB' }}>
        <AppBar appSwitcher profileMenu backgroundColor="#2b485c" />
        <AppContainer appBarOffset appFooterOffset="short">
          <div className={styles.content}>home content</div>
        </AppContainer>
        <AppFooter short>
          <span>© 2017 Veritone, Inc. All Rights Reserved.</span>
          <a href="#terms">Terms of Use</a>
          <a href="#privacy">Privacy Policy</a>
        </AppFooter>
      </div>
    );
  }
}
