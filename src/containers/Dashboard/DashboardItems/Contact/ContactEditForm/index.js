import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ContactForm from './ContactForm'
import { put_request } from '../../../../../utils/helper';
import { api_base_url } from '../../../../../config/api-configuration';
import history from '../../../../../config/history';

class ContactEditForm extends Component {

  submitHandler = (data, id) => {
    console.log(data);
    let phone = data.phone.split(',');
    let obj = {
      phone : phone,
      email : data.email,
      address : data.address
    }
    //api calls here
    put_request(api_base_url + "/admin/contact/" + id, obj)
    .then(res => {
      console.log(res)
      history.push('/dashboard/contact-data')
    })
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
        <Grid item xs={5}>
        <Paper style = {{padding : "16px"}}>
        <ContactForm submitHandler = {this.submitHandler}/>
        </Paper>
        </Grid>   
        <Grid item xs={7}>

        </Grid>
        </Grid>
      </div>
    );
  }
}

export default ContactEditForm;
