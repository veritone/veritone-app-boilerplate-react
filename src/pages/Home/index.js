import React from 'react';
// import {  } from 'prop-types';
import { AppFooter, AppContainer, AppBar } from 'veritone-react-common';
import styles from './styles.scss';
import Link from 'redux-first-router-link'

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ height: '100%', backgroundColor: '#2196F3' }}>
        <AppBar />
        <AppContainer appBarOffset appFooterOffset="short">
          <div className={styles.content}>
            home content
            <Link to='/asdf'>test</Link>
          </div>
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
