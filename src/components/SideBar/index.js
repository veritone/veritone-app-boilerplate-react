import React from 'react';
// import {} from 'lodash';
import { appBarHeight, topBarHeight } from 'veritone-react-common';
import styles from './styles.scss';
import Solutions from './components/solutions';
import Tags from './components/tags';
import Industry from './components/industry';

export default class SideBar extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <aside
        className={styles.container}
        style={{
          top: appBarHeight + topBarHeight
        }}
      >
        <Solutions />
        <Tags />
        <Industry />
      </aside>
    );
  }
}
