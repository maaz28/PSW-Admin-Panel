import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper, Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import history from '../../../../config/history';
import { api_base_url } from '../../../../config/api-configuration';
import {CONTACT_DATA} from '../../../../redux/actions/root.action';
import { get_request, delete_request } from '../../../../utils/helper';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Add';

class Contact extends Component { 


    state = {
  contact : [{
              email : "loading ...",
	            phone : ["loading ..."],
	            address : "loading ..." } ],
  count : 0
            }

    componentDidMount() {
    get_request(api_base_url + "/contact")
    .then(res => {
      console.log(res)
      this.setState ({
        contact : res.data.result,
        count : res.data.result.length
      })
    })
  }

  editContactHandler = (data) => {
    console.log('works');
    this.props.CONTACT_DATA(data); 
    history.push('/dashboard/contact-edit')
  }

  addHandler = () => {
    history.push('/dashboard/add-contact')
  }

  deleteHandler = (id) => {
    console.log(id);
    let pos = this.state.contact.map(function(e) { return e._id; }).indexOf(id);
let arr=this.state.contact;
    delete_request(api_base_url + "/admin/contact/" + id, {"x-access-token" : this.props.token} )
    .then(res => {
      console.log(res)
    })
    arr.splice(pos,1);
this.setState({
  contact:arr
})
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
        {
          this.state.contact.map((item, i) => (
            <React.Fragment>
        <Grid xs={12} md = {6}>
        <Paper style = {{padding : "16px"}}>
        <Button title = "Edit" style = {{float : 'right'}} onClick = {() => { this.deleteHandler(item._id) }}>
        <Delete/>
        </Button>
        <Button title = "Edit" style = {{float : 'right'}} onClick = {() => { this.editContactHandler(item) }}>
        <Edit/>
        </Button>
        <address style = {{paddingRight : '1em'}}>
										<div>
								<p>Title : <a>{item.title}</a></p>
								<p>{item.address}</p>
								<p>{item.phone.map((item, i) => (
																<div> {item}</div>
								))}</p>
								<p>E-mail : <a>{item.email}</a></p>
										</div>
				</address>
        </Paper>
        <br/>   
        </Grid>
        <Grid xs={0} md = {6}>
        </Grid>
        </React.Fragment>   
          ))
        }
        {
          (this.state.contact.length < 3) ? (
        <div>
        <Button variant="contained" color="primary" onClick = {this.addHandler} >
         Add Contact Info 
        <DeleteIcon />
      </Button>
        </div>
          ) : null
        }
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

function mapStateToProp(state) {
  return ({
    token : state.user_reducer.token
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Contact);
