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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 

     


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
        existing_images : [],
        dialogOpen : false,
        // checked : {
        //   pink : false,
        //   red : false,
        //   white : false,
        //   black : false
        // }
    }

    componentDidMount () { 
      let edit_obj = this.props.edit_obj;
      // let imagesArr = edit_obj.images; 
      // for(var i=edit_obj.images.length; i<3; i++){
      //     imagesArr[i] = ""
      // }
      this.setState ({
        category : edit_obj.category,
        title : edit_obj.title, 
        description : edit_obj.description,
        price : edit_obj.price,
        short_title_description : edit_obj.short_title_description,
        category : edit_obj.category,
        color : edit_obj.color,
        existing_images : edit_obj.images
    })
    }

    colorHandler = value => event => {
      console.log(value);
      let arr = this.state.color;
    if (event.target.checked) {
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
    };





    closePopupHandler = () => {
        this.setState({
          dialogOpen : false
        });
        history.push('/dashboard/all-products')
      }
    
      onChangeParentHandler = (name ,value) => {
        console.log(name, value)
      }

      submitHandler = (id) =>{
         console.log(id)
        this.setState({
          loader : true
        })
        const stateObj = this.state;
        if(stateObj.title === '' || stateObj.description === '' )
        {
          alert('Some Fields Are Missing')
          this.setState({
            loader : false
          })
        }else{
          let imgs = this.state.existing_images.concat(this.state.images)
          let obj = {
            "x-access-token" : this.props.token,
             title : stateObj.title,
      description : stateObj.description,
      price : stateObj.price,
      short_title_description : stateObj.short_title_description,
      category : stateObj.category,
      color : stateObj.color,
      images : imgs,
      rating : 5
          }
          console.log(obj);
        put_request(api_base_url + "/admin/product/" + id, obj)
        .then(res => {
          this.setState({
            loader : false,
            dialogOpen : true
          })
        })
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

  deleteBtnHandler = (value) => {
    let arr = this.state.existing_images;
    let ind = arr.indexOf(value);
    arr.splice(ind, 1);
    this.setState({
      existing_images : arr
    })
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
          value={this.state.title}
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
          value={this.state.description}
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
          value={this.state.short_title_description}
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
          value={this.state.price}
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
            <MenuItem value={"Natural-Salt-Lamp"}>Natural Salt Lamps</MenuItem>
            <MenuItem value={"Crafted-Salt-Lamp"}>Crafted Salt Lamps</MenuItem>
            <MenuItem value={"Aroma-Salt-Lamp"}>Aroma Salt Lamps</MenuItem>
            <MenuItem value={"USB-Salt-Lamp"}>USB Salt Lamps</MenuItem>
            <MenuItem value={"Iron-Salt-Baskets"}>Iron Salt Baskets</MenuItem>
            <MenuItem value={"Wooden-Salt-Baskets"}>WoodenSalt Baskets</MenuItem>
            <MenuItem value={"Night-Light-Lamp"}>Night Light Lamps</MenuItem>
            <MenuItem value={"Edible-Salt"}>Edible Salts</MenuItem>
            <MenuItem value={"Animal-Lick-Salt"}>Animal Lick Salt</MenuItem>
            <MenuItem value={"Salt-Tiles"}>Salt Tiles</MenuItem>
            <MenuItem value={"Candle-Holders"}>Candel Holders</MenuItem>
            <MenuItem value={"Health-Care-Products"}>Health Care Products</MenuItem>
          </Select>
          </FormControl>


          <FormControl component="fieldset" className={classes.formControl} style={{width:'50%'}}>
          <FormLabel component="legend">Color</FormLabel>
          <FormGroup>   
            <FormControlLabel
              control={
                <Checkbox onChange={this.colorHandler('red')} value="red" />
              }
              label="Red Color"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.colorHandler('pink')} value="pink" />
              }
              label="Pink Color"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.colorHandler('white')} value="white"/>
              }
              label="White Color"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={this.colorHandler('black')} value="black"/>
              }
              label="Black Color"
            />
          </FormGroup>
        </FormControl>



        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
      <div>
      <h4 className = "title">Product Images</h4>
      <Grid container spacing={24}>
      {
        this.state.existing_images.map((item, i) => (
        <Grid item xs={4}>  
          <div style={{ backgroundImage: 'url(' + item + ')', backgroundSize : 'cover', backgroundPosition : 'center', backgroundRepeat : 'no-repeat', width : '100px', height : '100px' }}>
          <DeleteOutlinedIcon title = "Delete" style = {{color : 'red', cursor : 'pointer'}} onClick = {this.deleteBtnHandler}/>          
          </div>
        </Grid>           
        ))
      }
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
        {/* <Grid item xs={4}>
      <ImageUploader urlHandler = {this.urlHandler}/>              
        </Grid>
        <Grid item xs={4}>
      <ImageUploader urlHandler = {this.urlHandler}/>              
        </Grid> */}
      </Grid>
      </div>
      <div>
      <Grid container spacing={24}>
          <Grid item xs={2}>
          <div style={{display:'inline-flex'}}>
      <Button variant="contained" color="primary" style = {{marginTop : '20px',marginRight:'8px'}} label="Submit" primary={true} onClick = {() => {this.submitHandler(this.props.edit_obj._id)} }>
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
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "Product Successfully Updated" preview = "/dashboard"/>
      </div>
      
      </div>
      
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProp(state) {
  console.log(state.productReducer.edit_obj, state.user_reducer.token)
  return ({
    edit_obj : state.productReducer.edit_obj,
    token : state.user_reducer.token
  })
}
  
export default connect(mapStateToProp, null)(withStyles(styles)(EventForm));