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

export default function ProductCard(props: Product) {
  const dispatch = useDispatch();

  const addToCartHandler = (product: any) => {
    console.log('adding to cart');
    console.log('added:', product);
    fetch('/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        item: product.name,
        price: 12.99,
        _id: Math.random(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    dispatch(cartSliceActions.updateCart());
  };

  return (
    <Card
      style={{
        backgroundColor: 'rgba(238, 178, 181, 0.8)',
        color: 'black',
      }}
      className="card"
    >
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
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
