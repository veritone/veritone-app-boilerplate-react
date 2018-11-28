import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { string, func, objectOf, any, bool } from 'prop-types';

import {
  selectCurrentRoutePayload,
  ROUTE_EXAMPLE_TABS
} from 'state/modules/routing';
import { engineIsLoading, selectEngine } from 'state/modules/engines-example';
import AppContainer from 'components/AppContainer';
import AppBar from 'components/AppBar';
import TopBar from 'components/TopBar';
import SideBar from 'components/SideBar';
import ContentContainer from 'components/ContentContainer';

import CategoriesTab from './CategoriesTab';
import TasksTab from './TasksTab';
import styles from './styles.scss';

@connect(
  state => ({
    currentTab: selectCurrentRoutePayload(state).tab,
    engineExampleData: selectEngine(
      state,
      '18502331-1a02-4261-8350-9f36bbabf9cf'
    ),
    engineExampleDataLoading: engineIsLoading(
      state,
      '18502331-1a02-4261-8350-9f36bbabf9cf'
    )
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
    navigateToTab: func.isRequired,
    engineExampleData: objectOf(any),
    engineExampleDataLoading: bool
  };

  handleChangeTab = (e, tabName) => {
    this.props.navigateToTab(tabName);
  };

  render() {
    const tabClasses = {
      root: styles.tab
    };

    const TabComponent = {
      categories: CategoriesTab,
      tasks: TasksTab
    }[this.props.currentTab];

    return (
      <Fragment>
        <SideBar />
        <AppBar />
        <TopBar />
        <AppContainer appBarOffset topBarOffset sideBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={12}>
                <p>
                  This is the tabbed example page. The following data is fetched
                  for all tabs:
                </p>
                {this.props.engineExampleDataLoading ? (
                  <CircularProgress />
                ) : (
                  <pre>
                    {JSON.stringify(this.props.engineExampleData, null, '\t')}
                  </pre>
                )}

                <Tabs
                  indicatorColor="primary"
                  value={this.props.currentTab}
                  onChange={this.handleChangeTab}
                >
                  <Tab
                    label="Categories"
                    value="categories"
                    classes={tabClasses}
                  />
                  <Tab label="Tasks" value="tasks" classes={tabClasses} />
                </Tabs>
                <TabComponent />
              </Grid>
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Fragment>
    );
  }
}
