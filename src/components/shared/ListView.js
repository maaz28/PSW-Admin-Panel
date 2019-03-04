import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/DoneOutline';
import Cancel from '@material-ui/icons/CancelOutlined';
import { millisecondsToCompleteDate } from '../../utils/helper';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    margin : '16px',
    position : 'inherit',

  },
});

const data = [
  {
    avatar : 'J',
    event_title : 'Annual Conference 2019',
    time : 'Jan, 29, 2019',
    invited_by : 'John Doe'
  },
  {
    avatar : 'J',
    event_title : 'Annual Conference 2019',
    time : 'Jan, 29, 2019',
    invited_by : 'John Doe'
  },
  {
    avatar : 'J',
    event_title : 'Annual Conference 2019',
    time : 'Jan, 29, 2019',
    invited_by : 'John Doe'
  }
]



function ListView(props) {
  const { classes } = props;
  return (
    <List dense = {true} className = {classes.root}>
    {
      (props.data.map((item, i) => (
      <ListItem>
        <Avatar>
          {item.user.avatar}
        </Avatar>
        <ListItemText primaryTypographyProps = {{style : {fontSize : '1.1em', fontWeight : 'bold'}}} primary={item.title} 
        secondary={
          <React.Fragment>
            <Typography component="subtitile1" >{millisecondsToCompleteDate(item.date.start)}</Typography>
            <Typography component="subtitile2" >invited by {item.user.email}</Typography>          
          </React.Fragment>
          } />
        <ListItemSecondaryAction>
      <Button onClick = {() => {props.ignoreHandler(item._id)}} title = "Reject Invitation" color="none" >
          <Cancel title = "Reject" style = {{color : 'red', margin : '16px', mouse : 'pointer'}}/>
      </Button>
      <Button onClick = {() => {props.acceptHandler(item._id)}} title = "Accept Invitation" color="none" >
          <Done title = "Accept" style = {{color : 'green', margin : '16px', mouse : 'pointer'}}/>
      </Button>
        </ListItemSecondaryAction>
      </ListItem>
      )))
    }
    </List>
  );
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListView);