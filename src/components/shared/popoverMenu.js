import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

// import MoreVertIcon from '@material-ui/icons/ima';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
      try{
        if (this.anchorEl.contains(event.target)) {
          return;
        }
      }
      catch(err){
        console.log(err);
      }
    this.setState({ open: false });
  };

  logoutHandler = () => {
    this.props.logoutHandller();
    this.setState({ open: false });
  }

  invitesHandler = () => {
    this.props.invitesHandler();
    this.setState({ open: false });
  }

  myEventsHandler = () => {
    this.props.myEventsHandler();
    this.setState({ open: false });
  }

  interestHandler = () => {
    this.props.interestHandler();
    this.setState({ open: false }); 
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            style = {{padding : 0}}
          >
            <Avatar
            >
            {this.props.avatarValue}
            </Avatar>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.interestHandler}>Interested Events</MenuItem>
                      <MenuItem onClick={this.invitesHandler}>Invite Requests</MenuItem>
                      <MenuItem onClick={this.myEventsHandler}>My Events</MenuItem>
                      <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);