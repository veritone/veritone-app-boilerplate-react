import React from 'react';

import styles from './styles.scss';

export default class Cta extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles['cta-area']}>
        <div className={styles['image']}>
          <svg
            width="148"
            height="148"
            viewBox="0 0 148 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="148" height="148" rx="74" fill="#EDF6FF" />
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="148"
              height="148"
            >
              <rect width="148" height="148" rx="74" fill="white" />
            </mask>
            <g mask="url(#mask0)" />
            <path
              d="M87 105.333V97.6667L91.3333 98.5C96.1667 99.5 100.667 96 101 91.1667L102 80.3333L106.833 78.3333C108.5 77.6667 109.167 75.6667 108.167 74L102 63.6667C101 51 93.8333 38.6667 75.3333 38.6667C56.3333 38.6667 47 52.6667 47 67C47 73 49.1667 78.5 52.5 83C55.5 87.1667 57 92.1667 57 97.1667V105.333H87Z"
              fill="#BBDEFB"
            />
            <path
              d="M86.1663 76.8333L83.6663 74.6666L89.333 67.8333L83.6663 60.9999L86.1663 58.8333L93.833 67.8333L86.1663 76.8333ZM64.4997 76.8333L56.833 67.8333L64.4997 58.8333L66.9997 60.9999L61.333 67.8333L66.9997 74.6666L64.4997 76.8333Z"
              fill="#3F51B5"
            />
            <path
              d="M69.2979 79.7719L77.9732 54.3797L81.1276 55.4574L72.4522 80.8496L69.2979 79.7719Z"
              fill="#3F51B5"
            />
          </svg>
        </div>
        <div className={styles['content']}>
          <div className={styles['title']}>
            Want to become a Solution Vendor
          </div>
          <div style={styles['subtitle']}>
            Register as a developer, submit your app, engine or your workflow
            and start monetizing easly with our Marketplace portal.
          </div>
          {/* <CustomBtn></CustomBtn> */}
        </div>
      </div>
    );
  }
}
