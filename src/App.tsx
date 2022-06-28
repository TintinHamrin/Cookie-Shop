import { lazy, Suspense, useEffect } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { authSliceActions, cartSliceActions } from "./store/store";
import { ApiClient } from "./ApiClient";
import { createTheme, ThemeProvider } from "@mui/material";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Products from "./Products";

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
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "/graphql",
  });

  //const Products = lazy(() => import("./Products"));
  const Cart = lazy(() => import("./Cart"));
  const About = lazy(() => import("./About"));
  const Checkout = lazy(() => import("./Checkout"));
  const Register = lazy(() => import("./Register"));
  const AccountPage = lazy(() => import("./AccountPage"));

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const isAuthenticated = await ApiClient.fetch("/");
      const response = await isAuthenticated;
      if (response.status === 200) dispatch(authSliceActions.logIn());
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
          <ApolloProvider client={client}>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/products" element={<Products />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/accountpage" element={<AccountPage />}></Route>
              </Routes>
            </Suspense>
          </ApolloProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
