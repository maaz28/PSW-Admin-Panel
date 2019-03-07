import React, { Component } from 'react';
import ProductCardView from '../../../../components/shared/card'
import Grid from '@material-ui/core/Grid';
import {get_request} from '../../../../utils/helper'
import {api_base_url} from '../../../../config/api-configuration'
import { CardActions, Button, Typography, CardContent, CardMedia, CardActionArea, Card } from '@material-ui/core';
 

class All extends Component {
  state = {
    product : []
  }
 
  componentDidMount () {
    get_request(api_base_url + "/products")
    .then((res) => {
      this.setState({
        product : res.data.result
      })
      // this.setState({
      //   products : res.data.result
      // })
    })
  }
   
  render() {
    const { classes } = this.props;
    return (

      <div className="App">
        <Grid container spacing={24}>
        {
          this.state.product.map((item, i) => (
        <Grid xs={4}>
        <Card >
      <CardActionArea>
        <CardMedia
          
          image="https://goo.gl/images/B5WXAr"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {obj.title} */}
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
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



export default (All);
