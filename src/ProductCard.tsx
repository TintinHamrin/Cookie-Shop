import * as React from 'react';
import './ProductCard.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from './Products';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from './store/store';
import { ThemeProvider } from '@mui/material';
import { theme } from './App';
import { useState } from 'react';

export default function ProductCard(props: Product) {

  const dispatch = useDispatch();

  const addToCartHandler = async (props: Product) => {
    fetch('/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
