import React from 'react';
// import {  } from 'prop-types';
import { AppFooter, AppContainer, AppBar } from 'veritone-react-common';
import styles from './styles.scss';

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#2196F3' }}>
        <AppBar />
        <AppContainer appBarOffset appFooterOffset="tall">
          <div className={styles.content}>this is the home page content</div>
        </AppContainer>
        <AppFooter tall>
          <span>© 2017 Veritone, Inc. All Rights Reserved.</span>
          <a href="#terms">Terms of Use</a>
          <a href="#privacy">Privacy Policy</a>
        </AppFooter>
      </div>
    );
  }
}
