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

class EventForm extends React.Component {
    
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

    componentWillReceiveProps () {
      let edit_obj = this.props.edit_obj
      this.setState ({
        category : edit_obj.category,
        title : edit_obj.title, 
        description : edit_obj.description,
        price : edit_obj.price,
        short_title_description : edit_obj.short_title_description,
        category : edit_obj.category,
        color : edit_obj.color,
        images : edit_obj.images
    })
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
             title : stateObj.title,
      description : stateObj.description,
      price : stateObj.price,
      short_title_description : stateObj.short_title_description,
      category : stateObj.category,
      color : stateObj.color,
      product_images : stateObj.images 
          }
        put_request(api_base_url+"/admin/product"+id,obj)
          
        }
      }
    
    
      urlHandler = (url) => {
        console.log(url);
        let arr = this.state.images;
        arr.push(url);
        this.setState({
          images : arr
        })
      }
  handleChange = name => event => {
      console.log(name, event.target.value)
      this.setState({
        [name] : event.target.value
      })
    //   this.props.onChangeParentHandler(name, event.target.value);
  };

  handleDropDownChange = event => {
    console.log(event.target.value)
    this.setState({ category : event.target.value });
    //   this.props.onChangeParentHandler("category", event.target.value);
  };

  handleSelectChange = name => event => {
    console.log(event.target.value, event.target.checked, event.target.selected);
    this.colorHandler(event.target.value,event.target.checked);
    // this.props.colorHandler(event.target.value, event.target.checked);
  };

  titleErrHandler = (ev) => {
    console.log(ev.target.value);
    if(ev.target.value === ''){
      this.setState({
        title_err : true,
        titleHelperText : 'This Field is required'
      })
    }
    else if(ev.target.value.length > 40){
      this.setState({
        title_err : true,
        titleHelperText : 'Title is longer than 40 characters'
      })
    }
  }


  render() {
    const { classes } = this.props;

    return (
        <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          fullWidth
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          placeholder = "Natural Salt Lamp | Best Quality"
          onChange = {this.handleChange('title')}
          />
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="description"
          label="Detailed Description"
          className={classes.textField}
          multiline
          rowsMax="2"   
          margin="normal" 
          onChange = {this.handleChange('description')}
        />

          <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          // fullWidth
          id="title"
          label="Short Description"
          className={classes.textField}
          margin="normal"
          placeholder = "short Description"
          onChange = {this.handleChange('short_title_description')}
          />
        <TextField 
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          fullWidth
          id="Cost"
          type = "number"
          label="Price"
          className={classes.textField}
          margin="normal"
          placeholder = "20000"
          onChange = {this.handleChange('price')}
        />


            <FormControl className={classes.formControl}  style={{width:'50%'}}>      
         <InputLabel htmlFor="age-simple">Category</InputLabel>
          <Select 
            value= {this.state.category}
            onChange={this.handleDropDownChange}
          >
            <MenuItem> 
              <em>None</em>
            </MenuItem>
            <MenuItem value={"natural_salt_lamp"}>Natural Salt Lamps</MenuItem>
            <MenuItem value={"crafted_salt_lamp"}>Crafted Salt Lamps</MenuItem>
            <MenuItem value={"aroma_salt_lamp"}>Aroma Salt Lamps</MenuItem>
            <MenuItem value={"usb_salt_lamp"}>USB Salt Lamps</MenuItem>
            <MenuItem value={"iron_Salt_basket"}>Iron Salt Baskets</MenuItem>
            <MenuItem value={"wooden_salt_basket"}>WoodenSalt Baskets</MenuItem>
            <MenuItem value={"night_light_lamp"}>Night Light Lamps</MenuItem>
            <MenuItem value={"edible_salt"}>Edible Salts</MenuItem>
            <MenuItem value={"animal_lick_salt"}>Animal Lick Salt</MenuItem>
            <MenuItem value={"salt_tile"}>Salt Tiles</MenuItem>
            <MenuItem value={"candle_holder"}>Candel Holders</MenuItem>
            <MenuItem value={"health_care_product"}>Health Care Products</MenuItem>
          </Select>
          </FormControl>


          <FormControl component="fieldset" className={classes.formControl} style={{width:'50%'}}>
          <FormLabel component="legend">Color</FormLabel>
          <FormGroup>   
            <FormControlLabel
              control={
                <Checkbox  onChange={this.handleSelectChange('red')} value="red" />
              }
              label="Red Color"
            />
            <FormControlLabel
              control={
                <Checkbox  onChange={this.handleSelectChange('pink')} value="pink" />
              }
              label="Pink Color"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.handleSelectChange('white')} value="white"/>
              }
              label="White Color"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.handleSelectChange('black')} value="black"/>
              }
              label="Black Color"
            />
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>



        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
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

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProp(state) {
  console.log(state.productReducer.edit_obj)
  return ({
    edit_obj : state.productReducer.edit_obj
  })
}
  
export default connect(mapStateToProp, null)(withStyles(styles)(EventForm));