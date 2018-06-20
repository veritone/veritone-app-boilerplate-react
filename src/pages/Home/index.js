import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'redux-first-router-link';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';

import {
  ROUTE_EXAMPLE_TABS,
  ROUTE_EXAMPLE_TAKEOVER
} from 'state/modules/routing';
import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import TopBar from 'components/TopBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';
import ExampleFormDialog from 'components/ExampleFormDialog';

export default class Home extends React.Component {
  static propTypes = {};

  state = {
    exampleFormModalOpen: false
  };

  showExampleFormModal = () => {
    this.setState({ exampleFormModalOpen: true });
  };

  closeExampleFormModal = () => {
    this.setState({ exampleFormModalOpen: false });
  };

  handleSubmitExampleForm = values => {
    alert(JSON.stringify(values, null, '\t'));
    this.setState({ exampleFormModalOpen: false });
  };

  render() {
    return (
      <Fragment>
        <SideBar />
        <AppBar />
        <TopBar />
        <AppContainer appBarOffset topBarOffset sideBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={9}>
                <Webcam   
                  audio={false}
                  height={480}
                  screenshotFormat="image/webp"
                  width={640}
                />
              </Grid>
              <Grid item xs={3}>
                {'I am a child\n\n'.repeat(20)}
              </Grid>
              {this.state.exampleFormModalOpen && (
                // Note that this isn't open=this.state.exampleFormModalOpen
                // because we want to unmount the form to reset values when it closes.
                <ExampleFormDialog
                  open
                  onClose={this.closeExampleFormModal}
                  onSubmit={this.handleSubmitExampleForm}
                />
              )}
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Fragment>
    );
  }
}
