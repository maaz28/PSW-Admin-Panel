import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddEvent from '../../../AddEvent'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class AddProductForm extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AddEvent/>
      </div>
//       <form className={classes.container} noValidate autoComplete="off">
// <Grid container spacing={24}>
//         <Grid item xs={12}>
//         <TextField
//           id="outlined-dense"
//           label="Dense"
//           className={classNames(classes.textField, classes.dense)}
//           margin="dense"
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Multiline"
//           multiline
//           rowsMax="4"
//           value={this.state.multiline}
//           onChange={this.handleChange('multiline')}
//           className={classes.textField}
//           margin="normal"
//           helperText="hello"
//           variant="outlined"
//         />
//       </Grid>
//         <Grid item xs={12}>      
// </Grid>
// </Grid>

//       </form>
    );
  }
}

AddProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProductForm);