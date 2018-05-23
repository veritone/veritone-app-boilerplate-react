import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { string, func } from 'prop-types';
// import { push } from 'redux-first-router';

import {
  selectCurrentRoutePayload,
  ROUTE_EXAMPLE_TABS
} from 'state/modules/routing';
import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import TopBar from 'components/TopBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';
import styles from './styles.scss';

@connect(
  state => ({
    currentTab: selectCurrentRoutePayload(state).tab
  }),
  {
    navigateToTab: tabName => ({
      type: ROUTE_EXAMPLE_TABS,
      payload: { tab: tabName }
    })
  }
)
export default class ExampleTabs extends React.Component {
  static propTypes = {
    currentTab: string.isRequired,
    navigateToTab: func.isRequired
  };

  handleChangeTab = (e, tabName) => {
    this.props.navigateToTab(tabName);
  };

  render() {
    const tabClasses = {
      root: styles.tab
    };

    return (
      <Fragment>
        <SideBar />
        <AppBar />
        <TopBar />
        <AppContainer appBarOffset topBarOffset sideBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  value={this.props.currentTab}
                  onChange={this.handleChangeTab}
                >
                  <Tab label="Media" value="media" classes={tabClasses} />
                  <Tab
                    label="Processed"
                    value="processed"
                    classes={tabClasses}
                  />
                  <Tab label="Suspects" value="suspects" classes={tabClasses} />
                  <Tab label="Notes" value="notes" classes={tabClasses} />
                </Tabs>
                This is the tabbed example page. Current tab is{' '}
                {this.props.currentTab}
              </Grid>
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Fragment>
    );
  }
}
