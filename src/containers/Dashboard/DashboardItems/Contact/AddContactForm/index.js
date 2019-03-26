import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper, Button } from '@material-ui/core';
import { put_request, post_request } from '../../../../../utils/helper';
import { api_base_url } from '../../../../../config/api-configuration';
import history from '../../../../../config/history';
import ContactForm from '../ContactEditForm/ContactForm';
import { connect } from 'react-redux';

class ContactAddForm extends Component {
 
  submitHandler = (obj) => {
    obj["x-access-token"] = this.props.token;
    post_request(api_base_url + "/admin/contact", obj)
    .then(res => {
      console.log(res);
      history.push('/dashboard/contact-data')
    })
  }

  render() {
    return ( 
      <div className="App">
        <Grid container spacing={24}>
        <Grid item xs={12} md={5}>
        <Paper style = {{padding : "16px"}}>
        <ContactForm submitHandler = {this.submitHandler} contact_data = {{}}/>
        </Paper>
        </Grid>   
        <Grid item xs={0} md={7}>
        </Grid>
        </Grid>
      </div>
    );
  }
}


function mapStateToProp(state) {
  return ({
    token : state.user_reducer.token
  })
}

export default connect(mapStateToProp, null)(ContactAddForm);
