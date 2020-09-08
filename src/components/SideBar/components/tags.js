import React from 'react';

import styles from '../styles.scss';

export default class Tags extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles['tags']}>
        <div className={styles['title']}>Tags</div>
        <div className={styles['wrapper-items']}>
          <div className={styles['item']}>Analytics</div>
          <div className={styles['item']}>Communication</div>
          <div className={styles['item']}>Colllaboration</div>
          <div className={styles['item']}>Media</div>
          <div className={styles['item']}>Productivity</div>
          <div className={styles['item']}>View More Tags →</div>
        </div>
      </div>
    );
  }
}
