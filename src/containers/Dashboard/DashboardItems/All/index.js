import React, { Component } from 'react';
import ProductCardView from '../../../../components/shared/card'
import Grid from '@material-ui/core/Grid';


class All extends Component {

  
  render() {
    const { classes } = this.props;
    return (

      <div className="App">
        <Grid container spacing={24}>
        <Grid item xs={8}>
          <ProductCardView/>
        </Grid>
        <Grid item xs={8}>
            
        </Grid>
        </Grid>
      </div>
    );
  }
}



export default (All);
