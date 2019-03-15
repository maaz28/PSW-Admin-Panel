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
  images : [],
  dialogOpen : false
}

closePopupHandler = () => {
  this.setState({
    dialogOpen : false
  });
  history.push('/dashboard/all-products')
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
    this.setState({
      loader : true
    })
    const stateObj = this.state;
    if(stateObj.title === '' || stateObj.description === '' || stateObj.images.length === 0)
    {
      alert('Some Fields Are Missing')
      this.setState({
        loader : false
      })
    }else{
      let obj = {
            "x-access-token" : this.props.token,
         title : stateObj.title,
  description : stateObj.description,
  price : stateObj.price,
  short_title_description : stateObj.short_title_description,
  category : stateObj.category,
  color : stateObj.color,
  images : stateObj.images,
  rating : 5 
      }
        post_request(api_base_url + '/admin/product', obj)
        .then((res) => {
          this.setState({
            loader : false,
              title : '',
              description : '',
              price : '', 
              short_title_description : '',
              category : '',
              color : [],
              images : [], 
              dialogOpen : true
          })
        })
      .catch(err => console.log(err))
    }
  }


  onChangeParentHandler = (name ,value) => {
    console.log(name, value)
    this.setState({
    [name]: value,
    });
  }

  urlHandler = (url) => {
    console.log(url);
    let arr = this.state.images;
    arr.push(url);
    this.setState({
      images : arr
    })
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
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "Product Successfully Added" preview = "/dashboard"/>
      </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({
    name : state.user_reducer.name,
    email : state.user_reducer.email,
    password : state.user_reducer.password,
    token : state.user_reducer.token
  })
}

export default connect(mapStateToProp, null)(AddEventForm);