import React from 'react';
import styles from './styles.scss';
import { string } from 'prop-types';

export default class Back extends React.Component {
  static propTypes = {
    color: string
  };
  static defaultProps = {};

  render() {
    return (
      <div className={styles['back']}>
        <div style={{ color: this.props.color || 'inherit' }}>
          Back to Marketplace
        </div>
      </div>
    );
  }
}
