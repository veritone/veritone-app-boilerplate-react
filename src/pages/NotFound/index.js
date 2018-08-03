import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'redux-first-router-link';

import AppContainer from 'components/AppContainer';
import errorLoading from 'resources/images/error-loading.svg';
import styles from './styles.scss';
import { ROUTE_HOME } from '../../state/modules/routing';

export default class NotFound extends React.Component {
  render() {
    return (
      <AppContainer>
        <div className={styles.container}>
          <img src={errorLoading} className={styles.bigImage} />
          <Typography variant="headline" className={styles.headline}>
            Page Not Found
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            {
              "The page you are looking for has been moved, deleted or doesn't exist."
            }
          </Typography>
          <Link to={{ type: ROUTE_HOME }}>
            <Button
              className={styles.actionButton}
              variant="raised"
              color="primary"
            >
              Home
            </Button>
          </Link>
        </div>
      </AppContainer>
    );
  }
}
