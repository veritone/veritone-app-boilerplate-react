import React from 'react';
import { range } from 'lodash';
import { string, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RefreshIcon from '@material-ui/icons/Refresh';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import AppContainer from 'components/AppContainer';
import ContentContainer from 'components/ContentContainer';
import styles from './styles.scss';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

@connect(null, (dispatch, ownProps) => ({
  // navigate to the page this modal has "opened over"
  onClose: () => dispatch({ type: ownProps.currentRoute.modalOver })
}))
export default class ExampleTakeoverModal extends React.Component {
  static propTypes = {
    // eslint-disable-next-line
    currentRoute: shape({
      modalOver: string.isRequired
    }).isRequired,
    onClose: func.isRequired
  };

  state = {
    currentTab: 0
  };

  handleChangeTab = (e, tabName) => {
    this.setState({ currentTab: tabName });
  };

  render() {
    return (
      <Dialog
        fullScreen
        open
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          position="fixed"
          classes={{
            root: styles.appBar
          }}
          color="primary"
        >
          <Toolbar
            classes={{
              root: styles.upperToolBar
            }}
          >
            <Typography
              variant="subheading"
              color="inherit"
              className={styles.title}
            >
              Processed Details: 12345.MOV
            </Typography>
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
            <IconButton color="inherit" onClick={this.props.onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>

          <Toolbar
            classes={{
              root: styles.lowerToolBar
            }}
          >
            <Tabs
              indicatorColor="secondary"
              value={this.state.currentTab}
              onChange={this.handleChangeTab}
            >
              <Tab label="Categories" />
              <Tab label="Tasks" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <AppContainer appBarOffset topBarOffset>
          <ContentContainer>
            <Grid container>
              <Grid item xs={12}>
                <GridList cellHeight={200} cols={3}>
                  {range(30).map(i => (
                    <GridListTile key={i}>
                      <img src={`https://picsum.photos/200?random&seed=${i}`} />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
            </Grid>
          </ContentContainer>
        </AppContainer>
      </Dialog>
    );
  }
}
