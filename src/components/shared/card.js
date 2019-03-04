import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'; 
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/InsertInvitation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { millisecondsToDate, millisecondsToMonth, millisecondsToDay, delete_request } from '../../utils/helper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import More from './More';
import { Button } from '@material-ui/core';
import SuccessSnackbar from './SuccessSnackbar';
import SimpleDialog from '../../containers/Home/SimpleDialog';
import { api_base_url } from '../../config/api-configuration';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#F50057',
  },
  action : {
    color : 'red'
  }
});

class CardView extends React.Component {
  state = { expanded: false, interested : false, showPopuop : false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  cardClickHandler = (details) => {
    console.log('Card Clicked', details)
    this.props.parentClickHandler(details);
  }

  componentDidMount(){
    console.log(this.props.details)
    if(this.props.interested) {
      this.setState({
        interested : true
      })
    }
  }

  editHandler = (id) => {
    this.props.editHandler(id)
  }

  deleteHandler = (id) => {
    this.props.deleteHandler(id)
  }

  inviteHandler = (id) => {
    this.props.inviteHandler(id);
  }

  interestCLickHandler = (id) => {
    if(this.props.interested){
      if(this.state.interested === true) {
        this.props.deleteInterested(id);
        // this.setState({
        //   interested : !this.state.interested
        // })
      }
    } 
    else{
      this.props.interestCLickHandler(id).then(res => {
        if(this.state.interested === true){
          this.setState({
            showPopuop : true
          })
        }
      })
    }
                this.setState({
                  interested : !this.state.interested
                })
  }


  render() {
    const { classes } = this.props;
    const { details } = this.props;
    return (
<Card className={classes.card} style={{cursor : "pointer", height : '100%'}}>
<CardMedia onClick={()=> this.cardClickHandler(details)}
                className={classes.media}
                image={details.image_url}
                />
    <CardHeader avatar={
      <React.Fragment>
        <div style = {{color : 'red', textAlign : 'center'}}> { millisecondsToMonth( details.date.start ) } </div>
        <div style = {{textAlign : 'center', fontSize : '1.3em', marginTop : '4px'}}> { millisecondsToDate( details.date.start ) } </div>
      </React.Fragment>
    // <Avatar 
    // aria-label="Recipe" 
    // className={classes.avatar} 
    // title={details.user.name} 
    // onClick={()=>
    //     this.cardClickHandler(details)}>
    //     {details.user.avatar}
    //     </Avatar>
        }
        // whiteSpace : 'nowrap', overflow:'hidden',
        titleTypographyProps = {{style : {fontSize : '1.3em', height : '35px', overflow : 'hidden'}}} 
        action={
        (this.props.myEvents) ? (
        <More editHandler={()=> { this.editHandler(details._id) } }
            deleteHandler = {() => { this.deleteHandler(details._id) } }/>
            ) : null
            }
    title={details.title}
            subheader={ millisecondsToDay( details.date.start ) + " . " + details.venue}
            />
                <CardContent onClick={()=> this.cardClickHandler(details)}>
                    <Typography component="p" style={{height : '60px', overflow : 'hidden'}}>
                        {details.short_description}
                    </Typography>
                </CardContent>
                {
                  (this.props.login) ? (
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites" onClick={()=> this.interestCLickHandler(details._id)}
                        title = "interested" style = {(this.state.interested) ? {color : 'red'} : {color : 'gray'}}>
                        {(this.state.showPopuop) ? (
                        <SuccessSnackbar open={true} message={"Event added to the interested list"} />) : (null)}
                        <FavoriteIcon />
                    </IconButton>
                    {/* interested button */}
                        <SimpleDialog event_id={details._id} />
                </CardActions>
                  ) : null
                }
</Card>
    );
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);