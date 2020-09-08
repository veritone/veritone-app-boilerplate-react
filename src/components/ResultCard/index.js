import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.scss';
import { shape } from 'prop-types';

export default class ResultCard extends React.Component {
  static propTypes = {
    result: shape
  };
  static defaultProps = {};

  render() {
    let { result } = this.props;
    let { appId } = result;
    console.log('props', this.props.result);
    return (
      <NavLink
        exact
        to={`/details/${appId}`}
        activeStyle={{
          textDecoration: 'none',
          color: 'black'
        }}
      >
        <div className={styles['card']} onClick={this.goToDetailsPage}>
          <div className={styles['image']}>
            <img src="https://automaterecipes.veritone.com/wp-content/uploads/2019/09/EDL-flow.png" />
          </div>
          <div className={styles['wrapper-details']}>
            <div className={styles['title']}>{result.name}</div>
            <div className={styles['category']}>
              {result.customData.categoryId || null}
            </div>
            <div className={styles['description']}>
              {result.customData.description}
            </div>
          </div>
        </div>
      </NavLink>
    );
  }
}
