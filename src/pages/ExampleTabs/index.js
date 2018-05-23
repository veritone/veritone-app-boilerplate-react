import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import TopBar from 'components/TopBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';

export default class ExampleTabs extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <SideBar />
        <AppBar />
        <TopBar />
        <AppContainer appBarOffset topBarOffset sideBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={12}>
                This is the tabbed example page
              </Grid>
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Fragment>
    );
  }
}
