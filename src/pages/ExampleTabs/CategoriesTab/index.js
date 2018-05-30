import React from 'react';
import { bool, arrayOf, any } from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  engineCategoriesAreLoading,
  selectEngineCategories
} from 'state/modules/engines-example';
import RouteLoadingScreen from 'components/RouteLoadingScreen';

@connect(state => ({
  loading: engineCategoriesAreLoading(state),
  categories: selectEngineCategories(state)
}))
export default class CategoriesTab extends React.Component {
  static propTypes = {
    loading: bool,
    categories: arrayOf(any)
  };
  static defaultProps = {};

  render() {
    return (
      <div>
        <Typography variant="display1" gutterBottom>
          Engine Categories:
        </Typography>
        <Typography variant="body1" gutterBottom>
          (fetched when this tab is loaded)
        </Typography>
        {this.props.loading ? (
          <RouteLoadingScreen minDelay={500} />
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Icon Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.categories.map(category => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {JSON.stringify(category.type, null, '\t')}
                      </TableCell>
                      <TableCell>{category.iconClass}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    );
  }
}
