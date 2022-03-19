import React, { useEffect, useState } from 'react';
import './app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import Cart from './Cart';
import About from './About';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from './store/store';

function App() {
  const [cartItemsQt, setCartItemsQt] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/getCartItemQt')
      .then((res) => res.json())
      .then((data) => setCartItemsQt(data));
    dispatch(cartSliceActions.initialCartQt(cartItemsQt));
    console.log('fetching', cartItemsQt);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
