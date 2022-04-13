import * as React from 'react';
import './ProductCard.scss';
import { Product } from './Products';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from './store/store';
import { ApiClient } from './ApiClient';
//MUI
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard(props: Product) {

  const dispatch = useDispatch();

  const addToCartHandler = async (props: Product) => {
    ApiClient.fetch('/cart-items', {
      method: 'POST',
      body: JSON.stringify({
        productId: props._id,
        price: props.price
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data)); 

    dispatch(cartSliceActions.updateCart());
  };

  return (
      <Card className="card" sx={{ backgroundColor: 'primary.main' }}>
        <CardMedia
          component="img"
          height="194"
          image={props.img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography color="secondary" variant="h5" gutterBottom>
            {props.name}
          </Typography>
          <Typography color="secondary" variant="h6">
            ${props.price}
          </Typography>
          <Typography color="secondary" variant="body1" gutterBottom>
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            size="small"
            onClick={(e) => {
              addToCartHandler(props);
            }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
  );
}
