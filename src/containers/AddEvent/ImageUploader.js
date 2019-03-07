import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import {storage} from '../../config/api-configuration'; 
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 
// import Img from '@material-ui/icons/ImageAspectRatio'; 
import Img from '@material-ui/icons/CloudUpload'; 
// import Img from '@material-ui/icons/ImageOutlined'; 

class ImageUploader extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "" 
  };
 
  handleChangeUsername = event => this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    console.log(filename)
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    storage
      .ref("images")
      .child(filename)
      .getDownloadURL() 
      .then(url =>{ 
        this.setState({ avatarURL: url })
        this.props.urlHandler(url)
      });
  };

  

  deleteBtnHandler = () => {
    let that = this;
    var ref = storage.ref('images/' + this.state.avatar);
    ref.delete().then(function() {
      console.log('success');
      that.props.urlHandler('')
      that.setState({
        avatarURL : ''
      })
  })
  .catch(err => console.log(err))
}
 
  render() {
    return (
      <div>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL ? (
          <div style={{ backgroundImage: 'url(' + this.state.avatarURL + ')', backgroundSize : 'cover', backgroundPosition : 'center', backgroundRepeat : 'no-repeat', width : '100px', height : '100px' }}>
          <DeleteOutlinedIcon title = "Delete" style = {{color : 'red', cursor : 'pointer'}} onClick = {this.deleteBtnHandler}/>
          </div>
          ) : (
          <label style={{width : '110px', height : '110px',borderStyle : 'outset', display : 'block', pointer: 'cursor'}}>
          <Img style = {{cursor : 'pointer', width : '100px', height : '100px', color : 'bisque'}}/>
          <FileUploader
            hidden
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={storage.ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </label>
          )     
        }
      </div>
    );
  }
}
 
export default ImageUploader;