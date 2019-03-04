import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 1,
  },
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };

//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });
//   }

  handleChange = name => event => {
      console.log(event.target.value)
      this.props.selectHandler(name, event.target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="age-native-required">{this.props.title}</InputLabel>
          <Select
            fullWidth
            native
            value={this.state.age}
            onChange={this.handleChange(this.props.name)}
            name="age"
            inputProps={{
              id: 'age-native-required',
            }}
          >
              <option value="" />
          {this.props.items.map((item, i) => {
              return (
                  <option value={item} key = {i}>{item}</option>
              )
          })}
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);