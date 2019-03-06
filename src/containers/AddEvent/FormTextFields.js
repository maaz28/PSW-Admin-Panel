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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '48%',
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
    titleHelperText : ''
  }

  //Events Of Dynamic Field Used to update value in the parent
  firstFieldHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('video', value);
  }

  addMoreFieldsHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('dynamicVideoUrl', value);
  }

  handleChange = name => event => {
      console.log(name, event.target.value)
      this.props.onChangeParentHandler(name, event.target.value);
  };
  handleDropDownChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange = name => event => {
    this.setState({ [name]: event.target.checked });
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
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          placeholder = "Pizza Hut"
          onChange = {this.handleChange('name')}
          />
        {/* <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_address_short"
          label="Area"
          className={classes.textField}
          margin="normal"
          placeholder = "DHA phase 6"
          onChange = {this.handleChange('formatted_address_short')}
        /> */}
        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="description"
          label="Detailed Description"
          multiline
          rowsMax="2"
          style = {{marginLeft: '8px', marginRight: '8px',width:'50%'}}     
          margin="normal"
          onChange = {this.handleChange('description')}
        />
          {/* <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Detailed Description"
          className={classes.textField}
          margin="normal"
          placeholder = "XYZ product"
          onChange = {this.handleChange('formatted_address')}
          /> */}
        {/* <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_phone_number"
          label="Contact Number"
          className={classes.textField}
          margin="normal"
          placeholder = "+923311384234"
          onChange = {this.handleChange('formatted_phone_number')}
        /> */}

<TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Short Description"
          className={classes.textField}
          margin="normal"
          placeholder = "short Description"
          onChange = {this.handleChange('website')}
          />

        {/* <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="formatted_phone_number"
          label="Facebook Page Link"
          className={classes.textField}
          margin="normal"
          placeholder = "www.facebook.com"
          onChange = {this.handleChange('facebook_url')}
        /> */}

        {/* <TextField
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Type Of Restaurant"
          className={classes.textField}
          margin="normal"
          placeholder = "Fast Food, Cuisine etc"
          onChange = {this.handleChange('food_type')}
        /> */}
        <TextField
        // onBlur ={this.titleErrHandler}
        error = {this.state.formatted_address_short_err}
          required
          id="Cost"
          type = "number"
          label="Price"
          className={classes.textField}
          margin="normal"
          placeholder = "20000"
          onChange = {this.handleChange('cost')}
        />


            <FormControl className={classes.formControl}  style={{width:'50%'}}>      
         <InputLabel htmlFor="age-simple">Category</InputLabel>
          <Select
          
            
            value={this.state.age}
            onChange={this.handleDropDownChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Natural Salt Lamps</MenuItem>
            <MenuItem value={20}>Crafted Salt Lamps</MenuItem>
            <MenuItem value={30}>Aroma Salt Lamps</MenuItem>
            <MenuItem value={40}>USB Salt Lamps</MenuItem>
            <MenuItem value={10}>Iron Salt Baskets</MenuItem>
            <MenuItem value={20}>WoodenSalt Baskets</MenuItem>
            <MenuItem value={30}>Night Light Lamps</MenuItem>
            <MenuItem value={40}>Edible Salts</MenuItem>
            <MenuItem value={10}>Animal Lick Salt</MenuItem>
            <MenuItem value={20}>Salt Tiles</MenuItem>
            <MenuItem value={30}>Candel Holders</MenuItem>
            <MenuItem value={40}>Health Care Products</MenuItem>
            {/* <MenuItem value={50}>Red</MenuItem> */}
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
              label="Balack Color"
            />
          </FormGroup>
          {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>



        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);