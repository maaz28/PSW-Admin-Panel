import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import img from '../../assets/images/congrat.png';

class ConfirmationDialog extends React.Component {
  state = {
    open: this.props.open,
    title : '',
    preview : ''
  };

  componentWillReceiveProps(next){
      console.log(next);
    this.setState({
        open : next.open,
        title : next.title,
        preview : next.preview
    })
  }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
      this.props.closePopupHandler();
  };

//   previewHandler = () => {
//     if(this.state.preview === "/page"){
//       window.location.reload();
//     }
//     else{
//       history.push(this.state.preview);
//     }

//   }

  // componentWillUnmount(){
  //   console.log('destroy')
  // }

  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <img src = {img}/>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;