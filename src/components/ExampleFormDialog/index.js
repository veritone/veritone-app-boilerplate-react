import React from 'react';
import { func, bool } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { formComponents } from 'veritone-react-common';
const { Input, Select } = formComponents;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

@reduxForm({
  form: 'exampleForm'
})
export default class ExampleFormDialog extends React.Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    onClose: func.isRequired,
    open: bool,
    pristine: bool
  };
  static defaultProps = {};

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
      >
        <form onSubmit={this.props.handleSubmit}>
          <DialogTitle>Create New Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the following information.
            </DialogContentText>

            <FormControl fullWidth>
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder="First Name"
              />
            </FormControl>

            <FormControl fullWidth>
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
              />
            </FormControl>

            <FormControl fullWidth>
              <Field component={Select} name="age-field" style={{ width: 250 }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Field>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={this.props.pristine}
            >
              Create New
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
