import { useEffect } from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import About from './About';
import Checkout from './Checkout';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from './store/store'
import { ApiClient } from './ApiClient';
//MUI
import { createTheme, ThemeProvider } from '@mui/material';

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

export default function App() {
 const dispatch = useDispatch()

  useEffect(() => {
    ApiClient.fetch('/cart-id')  
      .then((res) => res.json())
      .then((data) => console.log(data));
  },[]);

  useEffect(() => {
    (async () => {
      const data = await ApiClient.fetch('/cart-items');
      const fetchedProducts = await data.json();
      const cartQt = fetchedProducts.Qt;
      dispatch(cartSliceActions.initialCartQt(cartQt))
    })();
  }, []);

  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
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


//TODO's 
// rename routers
// add login page 
// add user page w user info 
// split up state store to seperate files
// add nextJS
