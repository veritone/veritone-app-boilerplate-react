import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBar from 'components/SideBar';
import ResultCard from 'components/ResultCard';
import Back from 'components/Back';
import Cta from 'components/Cta';
import styles from './styles.scss';
import { shape } from 'prop-types';

class Results extends React.Component {
  static propTypes = {
    results: shape
  };

  state = {
    exampleFormModalOpen: false
  };

  render() {
    console.log('results: ', this.props.results);
    let { results } = this.props.results;

    return (
      <Fragment>
        <Header />
        <div className={styles['results-page']}>
          <Back />
          <div className={styles['content']}>
            <SideBar />
            <div className={styles['wrapper-results']}>
              <div className={styles['title']}>Results</div>
              {results && results.length
                ? results.map((result, index) => (
                    <ResultCard result={result} key={index} />
                  ))
                : null}
            </div>
          </div>
        </div>
        <Cta />
        <Footer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results
  };
}

export default connect(mapStateToProps)(Results);
