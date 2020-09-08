/* eslint-disable react/no-array-index-key */
import React from 'react';
import Logo from 'resources/images/logo-blue.svg';
import linksList from './links';
import FacebookIcon from 'resources/images/socialNetworks/facebook.svg';
import TwitterIcon from 'resources/images/socialNetworks/twitter.svg';
import styles from './styles.scss';

export default class Footer extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <footer>
        <img src={Logo} className={styles['logo']} />
        <div className={styles['links']}>
          {Object.keys(linksList).map((keyName, i) => (
            <ul key={i} className={i == 1 && styles['ul-center']}>
              <div className={styles['ul-title']}>{keyName}</div>
              {linksList[keyName].map((item, j) => (
                <li key={j}>
                  <a href={item.value}>{item.key}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className={styles['social-networks']}>
          <div className={styles['circle']}>
            <img src={FacebookIcon} />
          </div>
          <div className={styles['circle']}>
            <img src={TwitterIcon} />
          </div>
        </div>
      </footer>
    );
  }
}
