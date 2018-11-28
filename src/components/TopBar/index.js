import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { TopBar as LibTopBar } from 'veritone-react-common';
import {
  navigateCurrentRouteReturnTo,
  selectCurrentRouteReturnTo
} from 'state/modules/routing';
import { any, func, objectOf, shape, string } from 'prop-types';

@connect(
  state => ({
    currentRouteReturnTo: selectCurrentRouteReturnTo(state)
  }),
  {
    navigateBack: navigateCurrentRouteReturnTo
  }
)
class TopBar extends Component {
  static propTypes = {
    navigateBack: func.isRequired,
    currentRouteReturnTo: shape({
      label: string.isRequired,
      route: objectOf(any)
    })
  };

  render() {
    return (
      <LibTopBar
        appBarOffset
        {...this.props}
        backButton={!!get(this.props.currentRouteReturnTo, 'route', false)}
        onClickBackButton={this.props.navigateBack}
        leftText={get(this.props.currentRouteReturnTo, 'label')}
      />
    );
  }
}

export default TopBar;
