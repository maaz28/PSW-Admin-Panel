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
    category : ''
  }

  handleChange = name => event => {
      console.log(name, event.target.value)
      this.props.onChangeParentHandler(name, event.target.value);
  };

  handleDropDownChange = event => {
    console.log(event.target.value)
    this.setState({ category : event.target.value });
      this.props.onChangeParentHandler("category", event.target.value);
  };

  handleSelectChange = name => event => {
    console.log(event.target.value, event.target.checked, event.target.selected);
    this.props.colorHandler(event.target.value, event.target.checked);
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
          fullWidth
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          placeholder = "Natural Salt Lamp | Best Quality"
          onChange = {this.handleChange('title')}
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


        <TextField
        // onBlur ={this.titleErrHandler}
        
        error = {this.state.desc_err}
          required
          fullWidth
          id="description"
          label="Detailed Description"
          className={classes.textField}
          multiline
          rowsMax="3"   
          rows="3"
          margin="normal" 
          onChange = {this.handleChange('description')}
        />
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
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);