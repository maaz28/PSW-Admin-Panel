import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper, Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit'
import history from '../../../../config/history';
import { api_base_url } from '../../../../config/api-configuration';
import {CONTACT_DATA} from '../../../../redux/actions/root.action';
import { get_request } from '../../../../utils/helper';
import { connect } from 'react-redux';


class Contact extends Component { 


    state = {
  contact : {
    email : "loading ...",
	phone : ["loading ..."],
	address : "loading ..."}
    }

    componentDidMount() {
    get_request(api_base_url + "/contact")
    .then(res => {
      console.log(res)
      this.setState ({
        contact : res.data.result[0]
      })
    })
  }

  editContactHandler = () => {
    console.log('works');
    this.props.CONTACT_DATA(this.state.contact);
    history.push('/dashboard/contact-edit')
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
        <Grid item xs={12} md = {5}>
        <Paper style = {{padding : "16px"}}>
        <Button title = "Edit" style = {{float : 'right'}} onClick = {this.editContactHandler}>
        <Edit/>
        </Button>
        <address style = {{paddingRight : '1em'}}>
										<div>
								<p>{this.state.contact.address}</p>
								<p>{this.state.contact.phone.map((item, i) => (
																<div> {item}</div>
								))}</p>
								<p>E-mail : <a>{this.state.contact.email}</a></p>
										</div>
				</address>
        </Paper>
        </Grid>   
        <Grid item xs={0} md = {7}>

        </Grid>
        </Grid>
      </div>
    );
  }
}

// function mapStateToProp(state) {
// 	console.log(state)
// 	return ({
// 		isLogin : state.user_reducer.is_login,
// 		name : state.user_reducer.name,
// 		avatar : state.user_reducer.avatar
// 	})
// }

function mapDispatchToProp(dispatch) {
	return ({
		CONTACT_DATA : (data) => {
			dispatch(CONTACT_DATA(data));
		}
	})
}

export default connect(null, mapDispatchToProp)(Contact);
