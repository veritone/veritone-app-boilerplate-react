import React from 'react';

import styles from '../styles.scss';

export default class Industry extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles['industry']}>
        <div className={styles['title']}>Industry</div>
        <div className={styles['wrapper-items']}>
          <div className={styles['item']}>Advertising</div>
          <div className={styles['item']}>Compliance</div>
          <div className={styles['item']}>Digital Audio</div>
          <div className={styles['item']}>Government</div>
          <div className={styles['item']}>Justice</div>
          <div className={styles['item']}>View All Industries →</div>
        </div>
      </div>
    );
  }
}
