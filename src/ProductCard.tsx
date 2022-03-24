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
  const [cartIdArray, setCartIdArray] = useState('');
  const dispatch = useDispatch();

  //make a function to see if document with sessId exists
  // const seeIfCartIdExistsInDb = () => {
  //   fetch('/cartId')
  //     .then((res) => res.json())
  //     .then((data) => setCartIdArray(data));
  //   console.log(cartIdArray); //why is this 0 on every first item click?
  // };

  // TODO Q: im returning an array fr backend ok, but on the first click on each product it doesnt get correct arraylenght(gets 0 wrongly) and hence will create a new cart even when the cartId already exists in DB
  const addToCartHandler = async (product: any) => {
    // await seeIfCartIdExistsInDb();
    // console.log('arraylenght:', cartIdArray.length);
    // const cookie = document.cookie.split('=')[1];
    // console.log(cookie);
    // if (cartIdArray!.length === 0) {
    //   console.log('wrong!');
    fetch('/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        item: product.name,
        _id: Math.random(),
        price: product.price
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data)); //returning an array of obj

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
