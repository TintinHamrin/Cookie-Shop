import { useEffect } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products";
import Cart from "./Cart";
import About from "./About";
import Checkout from "./Checkout";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "./store/store";
import { ApiClient } from "./ApiClient";
//MUI
import { createTheme, ThemeProvider } from "@mui/material";
import Register from "./Register";

// type X = {
//   url: string, options: RequestInit
// }

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(250, 194, 160, 0.8)",
    },
    secondary: {
      main: "#402800",
    },
  },
  typography: {
    fontFamily: "Lora",
  },
});

export default function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   ApiClient.fetch("/cart-id")
  //     .then((res) => res.json())
  //     .then((data) => console.log("id:", data));
  // }, []);

  useEffect(() => {
    (async () => {
      const data = await ApiClient.fetch("/cart-items");
      const cartItems = await data.json();
      const cartQt = cartItems.length;
      dispatch(cartSliceActions.initialCartQt(cartQt));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await ApiClient.fetch("/cart-items");
      const data2 = await data.json();
      dispatch(cartSliceActions.initialCartQt(data2.cartItems.length));
    })();
  }, [dispatch]);

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
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
