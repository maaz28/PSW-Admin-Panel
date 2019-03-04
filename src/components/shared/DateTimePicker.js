import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  grid: {
    width: '100%' 
  },
};

class DateTimePicker extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date(),
  };

  componentWillReceiveProps(next, prev){
    console.log(next, prev)
    // this.props.parentDateHandler(next.ms);
    // if(next.ms !== prev.ms){
    //   this.setState({
    //     selectedDate : next.ms
    //   })
    // }
  }

  componentDidMount() {
    console.log(this.props.ms)
    if(this.props.ms !== 0){
      this.setState({
        selectedDate : this.props.ms
      })
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    console.log(date);
    let milliseconds = date.getTime();
    this.props.parentDateHandler(milliseconds);
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="baseline">
          <DatePicker
            margin="normal"
            label="Date"
            value={selectedDate}
            onChange={this.handleDateChange}
            style = {{marginLeft: '8px', marginRight: '8px'}}
          />
          <TimePicker
            margin="normal"
            label="Time"
            value={selectedDate}
            onChange={this.handleDateChange}    
            style = {{marginLeft: '8px', marginRight: '8px'}}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

DateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateTimePicker);