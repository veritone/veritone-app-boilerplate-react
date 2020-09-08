import React from 'react';
import SearchBar from '../SearchBar';
import Logo from 'resources/images/logo.svg';
import styles from './styles.scss';

export default class Header extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles['header']}>
        <div className={styles['header-content']}>
          <img src={Logo} className={styles['logo']} />
          <div className={styles['wrapper-searchbar']}>
            <SearchBar />
          </div>
          <div className={styles['links']}>
            <a>Browse</a>
            <a className={styles['profile']}>My Profile</a>
          </div>
          <div className="customBtn">Log In</div>
        </div>
      </div>
    );
  }
}
