import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  }
});

class ContactForm extends React.Component {
  state = {
      email : "admin@p",
      address : "fnwe93092",
      phone : "+92 331 1384444",
      error_message : ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };



  SubmitClick = () => {
      let obj = this.state;
      console.log(obj)
      if(obj.email_address === "" || obj.address === ""){
          this.setState ({
              error_message : "All the fields are required"
          })
      }else{
        this.setState({
          error_message : ""
        })
        this.props.submitHandler(obj, this.props.contact_data._id);
      }
  }  

  render() {
    const { classes, contact_data } = this.props;
  
    return (
        <div>
            <p style = {{color : 'red'}}>{this.state.error_message}</p>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Address"
          defaultValue = {contact_data.address}
          // value = {this.state.address}
          className={classes.textField}
          margin="normal"
          onChange = {this.handleChange("address")}
        />
                <TextField
          label="Contact Number"
          // value= {this.state.phone}
          className={classes.textField}
          defaultValue = {contact_data.phone}
          margin="normal"
          helperText = "multiple numbers can be entered in a comma separated manner"
          onChange = {this.handleChange('phone')}
        />
                <TextField
          label="Email"
          type = "email"
          suggestion = "email"
          defaultValue = {contact_data.email}
          className={classes.textField}
          margin="normal"
          onChange = {this.handleChange('email')}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick = {this.SubmitClick}>Submit</Button>
      </form>
        </div>
    );
  }
}
ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProp(state) {
	console.log(state.contact_reducer, state.user_reducer)
	return ({
		contact_data : state.contact_reducer.contact_data
	})
}


export default connect(mapStateToProp, null)(withStyles(styles)(ContactForm)); 