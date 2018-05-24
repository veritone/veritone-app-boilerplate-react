import React from 'react';
import { number } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.scss';

export default class RouteLoadingScreen extends React.Component {
  static propTypes = {
    minDelay: number
  };

  static defaultProps = {
    // only show loading screen after minDelay ms (prevent flashes)
    minDelay: 0
  };

  _timer = null; // eslint-disable-line

  state = {
    // immediately visible unless minDelay is set
    visible: this.props.minDelay <= 0
  };

  componentDidMount() {
    if (this.props.minDelay <= 0) {
      return;
    }

    this._timer = setTimeout(() => {
      this.setState({ visible: true });
    }, this.props.minDelay);
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    return this.state.visible ? (
      <div className={styles.container}>
        <CircularProgress size={125} thickness={1} />
      </div>
    ) : (
      <div />
    );
  }
}
