import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Grid, Divider } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
 
const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class MediaControlCard extends Component {

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  renderDate(ms){
    let date = new Date(ms);
    date = date.toString()
    return date;
  }

  render(){
    const { classes, theme, details } = this.props;
  return (
    <Card className={classes.card}>
    <MediaQuery query="(min-width: 600px)">    
        <CardMedia
        className={classes.cover}
        image={details.image_url}
        title={details.title}
      />
    </MediaQuery>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
          {details.title}
          </Typography>
          {/* <Grid container spacing={24}>
        <Grid item xs={4} md={3}></Grid>        
        </Grid> */}
        <Grid container spacing={24} style = {{marginTop : "16px"}}>
            <Grid item xs={4} md={3}>
            <Typography variant="subtitle2" style = {{backgroundColor : '#EFF1F4', textAlign : 'center', padding : '4px'}} gutterBottom>
                Venue
            </Typography>
            </Grid>
            <Grid item xs={8} md = {9}>
            <Typography variant="subtitle1" gutterBottom >
                 <Icon className={classNames(classes.icon, 'far fa-clock')} style = {{fontSize : '14px', marginRight : '8px'}} color="action" />
                 {details.venue}
            </Typography>
            </Grid>
            <Divider />
            <Grid item xs={4} md={3}>
            <Typography variant="subtitle2" gutterBottom style = {{backgroundColor : '#EFF1F4', textAlign : 'center', padding : '4px'}}>
                Time
            </Typography>
            </Grid>
            <Grid item xs={8} md = {9}>
            <Icon className={classNames(classes.icon, 'fas fa-map-marker-alt')} style = {{fontSize : '14px', marginRight : '8px'}} color="action" />
            {this.renderDate(details.date.start)}
            </Grid>
            <Divider />
            <Grid item xs={4} md={3}>
            <Typography variant="subtitle2" gutterBottom style = {{backgroundColor : '#EFF1F4', textAlign : 'center', padding : '4px'}}>
                Create By
            </Typography>
            </Grid>
            <Grid item xs={8} md = {9}>
            <Icon className={classNames(classes.icon, 'fas fa-user')} style = {{fontSize : '14px', marginRight : '8px'}} color="action" />
            {details.user.email}
            </Grid>
      </Grid>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography> */}
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="Previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="Next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div> */}
      </div>
    </Card>
  );
}
  
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);