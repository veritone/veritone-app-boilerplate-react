import React, { Fragment } from 'react';
import { TopBar } from 'veritone-react-common';
import Grid from '@material-ui/core/Grid';

import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';

export default class ExampleTabs extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <SideBar/>
        <AppBar/>
        <TopBar appBarOffset/>
        <AppContainer
          appBarOffset
          topBarOffset
          sideBarOffset
        >
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
