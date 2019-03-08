import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {get_request, delete_request} from '../../../../utils/helper'
import {api_base_url} from '../../../../config/api-configuration'
import { CardActions, Button, Typography, CardContent, CardMedia, CardActionArea, Card} from '@material-ui/core';
import history from '../../../../config/history';
import {connect} from 'react-redux';
import { EDIT_OBJ_DATA } from '../../../../redux/actions/root.action';


class All extends Component {
  state = {
    product : []
  }

  deleteBtnHandler= (id)=>{
console.log("delete")
delete_request(api_base_url+"/admin/product/"+id).
then((res)=>{
  console.log(res)
}
)
  }

  editBtnHanlder=(data)=>{
    this.props.EDIT_OBJ_DATA(data)
    history.push('/dashboard/edit-form');
  }
 
  componentDidMount () {
    get_request(api_base_url + "/products")
    .then((res) => {
      console.log(res.data.result)
      this.setState({
        product : res.data.result
      })
    })
  }
   
  render() {
    return (

      <div className="App">
        <Grid container spacing={24}>
        {
          this.state.product.map((item, i) => (
        <Grid xs={12} sm = {6} md = {4}>
        <Card  style={{margin:'8px',boxShadow:" 0 0 8px 1px grey"}}>
      <CardActionArea>
        <CardMedia
          style = {{ height: 0, paddingTop: '80%'}}
          image= {item.images[0]}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {obj.title} */}
          </Typography>
          <Typography component="p">
            {item.short_title_description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Link to='/dashboard/edit-form'> */}
        <Button size="small" color="primary" onClick={ () => {this.editBtnHanlder(item)} }>
          Edit
        </Button>
        {/* </Link> */}
        <Button size="small" color="primary" onClick={() => {this.deleteBtnHandler(item._id)} }>
          Delete
        </Button>
      </CardActions>
    </Card>      
        </Grid>
            ))
        }

        </Grid>
      </div>
    );
  }
}

function mapDispatchToProp(dispatch) {
	return ({
		EDIT_OBJ_DATA : (data) => {
			dispatch(EDIT_OBJ_DATA(data));
		}
	})
}



export default connect(null, mapDispatchToProp)(All);