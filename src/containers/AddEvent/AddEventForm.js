 import React, { Component } from 'react';
import {RaisedButton} from '@material-ui/core';
import EventForm from './FormTextFields';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import {post_request} from '../../utils/helper'
import { connect } from 'react-redux';
import Progress from '../../components/shared/CircularProgress';
import ImageUploader from './ImageUploader';
import { api_base_url } from '../../config/api-configuration';
import history from '../../config/history';
import Button from '@material-ui/core/Button';

class AddEventForm extends React.Component {
state ={
  title : '',
  description : '',
  price : '',
  short_title_description : '',
  category : '',
  color : [],
  images : []
}


closePopupHandler = () => {
  this.setState({
    dialogOpen : false
  });
  history.push('/')
}

colorHandler = (value, selected) => {
    let arr = this.state.color;
  if (selected) {
    arr.push(value);
    this.setState({
      color : arr
    })
  }
  else {
    let ind = arr.indexOf(value);
    if(ind !== -1) {
      arr.splice(ind, 1)
      this.setState({
        color : arr
      })
    } 
  }
}

  submitHandler = () =>{
    console.log(this.state)
    // this.setState({
    //   loader : true
    // })
    // const stateObj = this.state;
    // if(stateObj.title === '' || stateObj.description === '')
    // {
    //   alert('Some Fields Are Missing')
    //   this.setState({
    //     loader : false
    //   })
    // }else{
    //   let obj = {
    //     name: this.state.name,
    //     email : this.props.email,
    //     password : this.props.password,
    //     formatted_address: this.state.formatted_address,
    //     formatted_address_short: this.state.formatted_address_short,
    //     website: this.state.website,
    //     formatted_phone_number: this.state.formatted_phone_number,
    //     description: this.state.description,
    //     banner_image : this.state.banner_image,
    //     cost : this.state.cost,
    //     food_type : this.state.food_type,
    //     facebook_url : this.state.facebook_url,
    //   }
    //     post_request(api_base_url + '/portal/place-register', obj)
    //     .then((res) => {
    //       this.setState({
    //         loader : false,
    //         dialogOpen : true,
    //         title : '',
    //         short_description : '',
    //         description : '',
    //         venue : '',
    //         website_link : '',
    //         title_image : '',
    //         food_type: "",
    //         facebook_url: "",
    //         cost: 1,
    //       })
    //     })
    //   .catch(err => console.log(err))
    // }
  }


  onChangeParentHandler = (name ,value) => {
    console.log(name, value)
    this.setState({
    [name]: value,
    });
  }

  urlHandler = (url) => {
    console.log(url)
  }


  render() {

    return (
      <div>
      <EventForm onChangeParentHandler = {this.onChangeParentHandler} colorHandler = {this.colorHandler}/>
        <div>
        <h4 className = "title">Product Images</h4>
        <Grid container spacing={24}>
          <Grid item xs={4}>
        <ImageUploader urlHandler = {this.urlHandler}/>
          </Grid>
          <Grid item xs={4}>
        <ImageUploader urlHandler = {this.urlHandler}/>              
          </Grid>
          <Grid item xs={4}>
        <ImageUploader urlHandler = {this.urlHandler}/>              
          </Grid>
        </Grid>
        </div>
      <div>
      <Grid container spacing={24}>
          <Grid item xs={2}>
      <Button variant="contained" color="primary" style = {{marginTop : '20px'}} label="Submit" primary={true} onClick = {this.submitHandler}>
        Submit
      </Button>
          </Grid>
          <Grid item xs={10}>
          {
            (this.state.loader) ? (
              <Progress/>
            ) : (null)
          }
          </Grid>
      </Grid>
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "You've applied for listing at Foodies" preview = "/dashboard"/>
      </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({
    name : state.user_reducer.name,
    email : state.user_reducer.email,
    password : state.user_reducer.password
  })
}

export default connect(mapStateToProp, null)(AddEventForm);