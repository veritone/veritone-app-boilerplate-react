import React from 'react';

import styles from '../styles.scss';

export default class Solutions extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles['solutions']}>
        <div className={styles['title']}>Solutions</div>
        <div className={styles['wrapper-items']}>
          <div className={styles['item']}>Applications</div>
          <div className={styles['item']}>Engines</div>
          <div className={styles['item']}>Flows</div>
          <div className={styles['item']}>My Solutions</div>
        </div>
      </div>
    );
  }
}
