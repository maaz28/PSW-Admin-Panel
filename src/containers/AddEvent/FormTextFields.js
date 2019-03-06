import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '48%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class EventForm extends React.Component {

  state ={
    title_err : false,
    desc_err : false,
    formatted_address_short_err : false,
    titleHelperText : ''
  }

  //Events Of Dynamic Field Used to update value in the parent
  firstFieldHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('video', value);
  }

  addMoreFieldsHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('dynamicVideoUrl', value);
  }

  handleChange = name => event => {
      console.log(name, event.target.value)
      this.props.onChangeParentHandler(name, event.target.value);
  };

  titleErrHandler = (ev) => {
    console.log(ev.target.value);
    if(ev.target.value === ''){
      this.setState({
        title_err : true,
        titleHelperText : 'This Field is required'
      })
    }
    else if(ev.target.value.length > 40){
      this.setState({
        title_err : true,
        titleHelperText : 'Title is longer than 40 characters'
      })
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Restaurant Name"
          className={classes.textField}
          margin="normal"
          placeholder = "Pizza Hut"
          onChange = {this.handleChange('name')}
          />
        <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_address_short"
          label="Area"
          className={classes.textField}
          margin="normal"
          placeholder = "DHA phase 6"
          onChange = {this.handleChange('formatted_address_short')}
        />
          <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Complete Address"
          className={classes.textField}
          margin="normal"
          placeholder = "Lane 2, DHA phase V"
          onChange = {this.handleChange('formatted_address')}
          />
        <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_phone_number"
          label="Contact Number"
          className={classes.textField}
          margin="normal"
          placeholder = "+923311384234"
          onChange = {this.handleChange('formatted_phone_number')}
        />

<TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Website Link"
          className={classes.textField}
          margin="normal"
          placeholder = "www.abc.com"
          onChange = {this.handleChange('website')}
          />
        <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_phone_number"
          label="Facebook Page Link"
          className={classes.textField}
          margin="normal"
          placeholder = "www.facebook.com"
          onChange = {this.handleChange('facebook_url')}
        />

        <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Type Of Restaurant"
          className={classes.textField}
          margin="normal"
          placeholder = "Fast Food, Cuisine etc"
          onChange = {this.handleChange('food_type')}
          />
        <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="Cost"
          type = "number"
          label="Rate your cost [1, 2, 3]"
          className={classes.textField}
          margin="normal"
          placeholder = "1"
          onChange = {this.handleChange('cost')}
        />

          <TextField
          // onBlur ={this.titleErrHandler}
          error = {this.state.desc_err}
            required
            fullWidth
            id="description"
            label="Description"
            multiline
            rowsMax="2"
            style = {{marginLeft: '8px', marginRight: '8px'}}     
            margin="normal"
            onChange = {this.handleChange('description')}
          />
        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);