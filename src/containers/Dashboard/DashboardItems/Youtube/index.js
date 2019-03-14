import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import YoutubeForm from './YoutubeForm';
import { api_base_url } from '../../../../config/api-configuration';
import { put_request } from '../../../../utils/helper';

class Youtube extends Component {

state = {
  success : false
}

submitHandler = (url, id) => {
  console.log('====================================');
  console.log(url, id);
  console.log('====================================');
  put_request(api_base_url+ "/admin/video/" + id, {"link" : url})
  .then(res => {
    console.log(res);
    this.setState({
      success : true
    })
  })
}

  render() {
    return (
      <div className="App">
              <Grid container spacing={24}>
        <Grid item xs={6}>
        <Paper style = {{padding : "16px"}}>
        <YoutubeForm submitHandler = {this.submitHandler} success = {this.state.success}/>
        </Paper>
        </Grid>   
        <Grid item xs={6}>

        </Grid>
        </Grid>
      </div>
    );
  }
}

export default Youtube;
