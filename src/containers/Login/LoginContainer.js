import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import history from '../../config/history';
import { post_request } from '../../utils/helper';
import { db, auth, api_base_url } from '../../config/api-configuration';
import { connect } from 'react-redux';
import { USER_LOGGEDIN } from '../../redux/actions/root.action';

class LoginContainer extends Component {

  state = {
    errorMessage : ''
  }
  submitHandler = (data) => {
    console.log(data)
    post_request(api_base_url+"/admin/login", data)
    .then((res) => {
      console.log(res);
      if(res.responseCode === 200) {
        this.props.USER_LOGGEDIN(res.data.result);
        history.push('/dashboard');
      }
      else {
        this.setState({
          errorMessage : 'Email or Password is Incorrect !'
        })
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({
        errorMessage : err
      })
    })
  } 

  render() {
    return (
      <div className="App">
      <SignIn submitHandler = {this.submitHandler} errorMessage = {this.state.errorMessage}/>
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
		USER_LOGGEDIN : (data) => {
			dispatch(USER_LOGGEDIN(data));
		}
	})
}

export default connect(null, mapDispatchToProp)(LoginContainer);
