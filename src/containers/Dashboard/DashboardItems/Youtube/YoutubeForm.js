import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { api_base_url } from '../../../../config/api-configuration';
import { get_request } from '../../../../utils/helper';
 
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  }
});

class YoutubeForm extends React.Component {
  state = {
      url : "",
      id : "",
              info : {
                message : "",
                style : {
          color : "red"
                }
                }
  };

  componentDidMount() {
    get_request(api_base_url + "/video")
    .then((res) => {
      console.log(res)
      this.setState({
        url : res.data.result[0].link,
        id : res.data.result[0]._id
      })
    })
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.success)
    {
    this.setState({
      info : {
                message : "URL updated successfully",
                style : {
          color : "green"
                }
                }
    })
    }
  }
  
  

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }; 

  focusHandler = () => {
    this.setState({
      info : {
        message : "",
        style : {
          color : "red"
        }
      }
    })
  }

  SubmitClick = () => {
      let obj = this.state;
      console.log(obj)
      if(obj.url === "" || obj.url.indexOf("http") === -1 ){
          this.setState ({
              info : {
                message : "URL is not correct",
                style : {
          color : "red"
                }
                }
          })
      }else{
        this.setState({
                        info : {
                message : "",
                style : {
          color : "red"
                }
                }
        })
      console.log(obj.url)
        this.props.submitHandler(obj.url, obj.id);
      }
  }  

  render() {
    const { classes } = this.props;
  
    return (
        <div>
          <div style = {{height : '10px'}}>
            <p style = {this.state.info.style}> {this.state.info.message} </p>
            </div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Youtube URL"
          value={this.state.url}
          className={classes.textField}
          margin="normal"
          onChange = {this.handleChange('url')}
          onFocus = {this.focusHandler}
          helperText = "Enter a complete youtube url"
        /> 
        <Button variant="contained" color="primary" className={classes.button} onClick = {this.SubmitClick}>Submit</Button>
      </form>
        </div>
    );
  }
}
YoutubeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(YoutubeForm);