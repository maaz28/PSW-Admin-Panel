import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './config/routes'
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import store from './redux/store'; 
import './style/index.css';

const THEME = createMuiTheme({
    typography: {
        fontSize: '14px',
    }
 });  

ReactDOM.render( 
    <Provider store={store}> <MuiThemeProvider theme={THEME}> <Routing /> </MuiThemeProvider> </Provider>  , document.getElementById('root'));

