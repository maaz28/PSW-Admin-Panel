import React,{ Component } from "react";
import Dashboard from './Dashboard';
import history from "../config/history";
import Login from './Login';

// import Signup from '../containers/Signup';
import {
    Router,
    Route 
  } from 'react-router-dom';

export default class Main extends Component {
      
    render() {
        return (
            <Router history={history}>
            <React.Fragment>
              <div>
            {
              
              (this.props.login) ? (
            <React.Fragment>
              <Route path = '/dashboard' component={Dashboard}/>
              <Route exact path = '/' component={Dashboard}/>
            </React.Fragment> 
              ) : (
                <React.Fragment>
                <Route exact path = '/' component={Login}/>
                <Route  path = '/sign-in' component={Login}/>
                </React.Fragment>
                )
              }
                </div>
              <div>
               </div>
            </React.Fragment>
            </Router> 
          )    
    }
    
  }