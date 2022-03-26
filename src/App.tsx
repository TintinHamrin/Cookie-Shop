import React, { useEffect, useState } from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import About from './About';
import Checkout from './Checkout';
import { createTheme, ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { cartSliceActions } from './store/store'

//TODO ask Alex if this is bad practise to have in this folder
export const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(250, 194, 160, 0.8)',
    },
    secondary: {
      main: '#402800',
    },
  },
  typography: {
    fontFamily: 'Lora',
  },
});

function App() {
 const dispatch = useDispatch()

  useEffect(() => {
    fetch('/cartId')  //TODO rename to /cart-id/create
      .then((res) => res.json())
      .then((data) => console.log(data));
  },[]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/cart-items-detailed');
      const fetchedProducts = await data.json();
      const cartQt = fetchedProducts.Qt;
      dispatch(cartSliceActions.initialCartQt(cartQt))
    })();
  }, []);

  //FIXME 

  const clearCookieHandler = () => {
    fetch('/cartId-delete')   //TODO rename to /cart-id/delete ??
      .then((res) => res.json())
      .then((data) => console.log(data)); // 
  };

  const validateCookieHandler = () => {
    fetch('/cartId-validate')   //TODO rename to /cart-id/validate ??
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  // const updateCartHandler = () => {
  //   fetch('/cart-items')   
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };


  //TODO pass down the cartItemsState to prod.card
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <button onClick={clearCookieHandler}>clear cookie</button>
          <button onClick={validateCookieHandler}>validate cookie</button>
          <Routes>
            <Route path="/products" element={<Products />}></Route>  
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
