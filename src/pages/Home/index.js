import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'redux-first-router-link';

import { ROUTE_EXAMPLE_TABS } from 'state/modules/routing';
import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import TopBar from 'components/TopBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';

export default class Home extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <SideBar />
        <AppBar />
        <TopBar />
        <AppContainer
          appBarOffset
          topBarOffset
          sideBarOffset
        >
          <ContentContainer>
            <Grid container>
              <Grid item xs={6}>
                <Link to={{ type: ROUTE_EXAMPLE_TABS }}>Tabbed example</Link>
              </Grid>
              <Grid item xs={6}>
                {'home content test1234'.repeat(200)}
              </Grid>
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Fragment>
    );
  }
}
