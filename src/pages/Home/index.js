import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'redux-first-router-link';
import Button from '@material-ui/core/Button';

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
        <TopBar
          // eslint-disable-next-line
          renderActionButton={() => (
            <Button color="primary" variant="raised">
              test
            </Button>
          )}
        />
        <AppContainer appBarOffset topBarOffset sideBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={6}>
                <ul>
                  <li>
                    <Link to={{ type: ROUTE_EXAMPLE_TABS }}>
                      Tabbed example
                    </Link>
                  </li>
                  <li>
                    <Link to={{ type: ROUTE_EXAMPLE_TAKEOVER }}>
                      Fullscreen modal example
                    </Link>
                  </li>
                  <li>
                    <Button
                      variant="outlined"
                      onClick={this.showExampleFormModal}
                    >
                      Form input modal
                    </Button>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={6}>
                {'home content test1234'.repeat(200)}
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
