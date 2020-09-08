import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Back from 'components/Back';
import styles from './styles.scss';
import { shape, string } from 'prop-types';

class DetailsPage extends React.Component {
  static propTypes = {
    result: shape({
      name: string,
      description: string
    })
  };

  state = {};

  create = () => {
    window.open(
      'http://local.veritone.com/flow/c49b8bf3-68f8-4691-bbf0-18bdc4c88e29/84772898-e929-4316-a088-f009a68a0bd2'
    );
  };

  render() {
    console.log('result: ', this.props.result);
    let { result } = this.props;

    return (
      <Fragment>
        <Header />
        <div className={styles['details-page']}>
          <Back color={'white'} />
          {result && (
            <div className={styles['wrapper-card']}>
              <div className={styles['card']}>
                <div className={styles['image']}>
                  <img src="https://automaterecipes.veritone.com/wp-content/uploads/2019/09/EDL-flow.png" />
                </div>
                <div className={styles['wrapper-details']}>
                  <div className={styles['title']}>{result.name}</div>
                  <div className={styles['description']}>
                    {result.customData.description}
                  </div>
                </div>
              </div>
              <div className={styles['create']} onClick={this.create}>
                create in studio
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.result.resultData,
    id: state.location.payload
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
