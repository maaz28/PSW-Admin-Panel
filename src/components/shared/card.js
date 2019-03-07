import React from 'react';
import { CardActions, Button, Typography, CardContent, CardMedia, CardActionArea, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}; 

class ProductCardView extends React.PureComponent {

render() {
  const { classes } = this.props;
  return(
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://goo.gl/images/B5WXAr"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
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
  )
}
}
ProductCardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCardView);