import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import ImageUploader from '../../../AddEvent/ImageUploader';
import Button from '@material-ui/core/Button';
import Progress from '../../../../components/shared/CircularProgress';
import history from '../../../../config/history';
import ConfirmationDialog from '../../../../components/shared/ConfirmationDialog';
import { put_request } from '../../../../utils/helper';
import { api_base_url } from '../../../../config/api-configuration';
import {connect} from 'react-redux';

     


const styles = theme => ({
    container: {
    display: 'flex',
    flexWrap: 'wrap',
},
  textField: {
      marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '50%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class AddSaltBenefits extends React.Component {
    
    state ={
        title_err : false,
        desc_err : false,
        formatted_address_short_err : false,
        titleHelperText : '',
        category : '',
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
    
      onChangeParentHandler = (name ,value) => {
        console.log(name, value)
        // this.setState({
        // [name]: value,
        // });
      }
      submitHandler = (id) =>{
         console.log(this.state)
        //  let stateObj=this.state;
    //     this.setState({
    //       loader : true
    //     })
    //     const stateObj = this.state;
    //     if(stateObj.title === '' || stateObj.description === '' || stateObj.images.length === 0)
    //     {
    //       alert('Some Fields Are Missing')
    //       this.setState({
    //         loader : false
    //       })
    //     }else{
    //       let obj = {
    //         "x-access-token" : this.props.token,
    //          title : stateObj.title,
    //   description : stateObj.description,
    //   price : stateObj.price,
    //   short_title_description : stateObj.short_title_description,
    //   category : stateObj.category,
    //   color : stateObj.color,
    //   product_images : stateObj.images 
    //       }
    //     put_request(api_base_url+"/admin/product"+id,obj)
          
    //     }
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
    const { classes } = this.props;

    return (
        <div>
      <form className={classes.container} noValidate autoComplete="off">
        
      <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="title"
          label="Title"
          className={classes.textField}
        
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="subTitle"
          label="Sub Title"
          className={classes.textField}
        //   multiline
        //   rowsMax="3"   
        //   rows="3"
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="shortDescription"
          label="Short Description"
          className={classes.textField}
          multiline
          rowsMax="2"   
        //   rows="3"
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        
        

            



        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
      <div>
        <h4 className = "title">Product Images</h4>
        <Grid container spacing={24}>
          <Grid item xs={12}>
        <ImageUploader urlHandler = {this.urlHandler}/>
          </Grid>
         
        </Grid>
        </div>
      <div>
          <hr/>
        <h3>Benefits</h3>
        <div>

        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="heading"
          label="Heading"
          className={classes.textField}
        
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="paragraph"
          label="Paragraph"
          className={classes.textField}
        //   multiline
        //   rowsMax="3"   
        //   rows="3"
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="img-url"
          label="Img URL"
          className={classes.textField}
        //   multiline
        //   rowsMax="3"   
        //   rows="3"
          margin="normal" 
        //   onChange = {this.handleChange('description')}
        />
        <Button variant="contained" color="primary" style = {{marginTop : '20px',marginRight:'8px',display:'block'}} label="Add-More" primary={true} >
        Add 
      </Button>

        </div>



      <Grid container spacing={24}>
          <Grid item xs={2}>
          <div style={{display:'inline-flex'}}>
      <Button variant="contained" color="primary" style = {{marginTop : '20px',marginRight:'8px'}} label="Submit" primary={true} onClick = {this.submitHandler}>
        Submit
      </Button>
      {/* <Link to='/dashboard/all-products'>
      <Button variant="contained" color="primary" style = {{marginTop : '20px',backgroundColor:'red'}} label="cancel" primary={true} >
        Cancel
      </Button>
      </Link> */}
      </div>
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

AddSaltBenefits.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProp(state) {
//   console.log(state.productReducer.edit_obj)
  return ({
    
  })
}
  
export default connect(mapStateToProp, null)(withStyles(styles)(AddSaltBenefits));