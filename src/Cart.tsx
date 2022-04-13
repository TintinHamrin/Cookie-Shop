import {
  cartSliceActions,
  checkoutSliceActions,
  RootState,
} from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CartListItem from "./CartListItem";
import { ApiClient } from "./ApiClient";
//MUI
import { Button, Divider } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,

  maxHeight: "400px",
  overflow: "auto",
};

const listStyle = {
  maxHeight: "90%",
  overflow: "auto",
};

export type CartType = {
  _id: number;
  cartId: number;
  price: number;
  productId: number;
};

export default function Cart() {
  const cartIsOpen = useSelector((state: RootState) => state.cart.isOpen);

  const [fullCartDetails, setFullCartDetails] = useState<Array<CartType>>([]);
  const [fullCartQt, setFullCartQt] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cartSliceActions.toggleOpen(false));
  };

  const openCheckoutHandler = () => {
    dispatch(checkoutSliceActions.toggleOpen(true));
    dispatch(cartSliceActions.toggleOpen(false));
  };

  useEffect(() => {
    (async () => {
      const data = await ApiClient.fetch("/cart-items-detailed");
      const cartDetails = await data.json();
      const cartItems = cartDetails.fullCart;
      const cartQt = cartDetails.Qt;
      const sum = cartDetails.sum;
      setFullCartDetails(cartItems);
      setFullCartQt(cartQt);
      setTotalPrice(sum);
    })();
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={cartIsOpen}
        onClose={handleClose}
        onKeyDown={handleClose}
        onBackdropClick={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={cartIsOpen}>
          <Box color="secondary.main" sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Your cart
            </Typography>
            <Divider variant="fullWidth" />
            <Box sx={listStyle}>
              {fullCartDetails.map(
                (
                  product // -> cartitem
                ) => (
                  <CartListItem
                    price={product.price}
                    cartId={product.cartId}
                    _id={product._id}
                    productId={product.productId}
                  />
                )
              )}
            </Box>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Items: {fullCartQt}
            </Typography>
            <Divider variant="fullWidth" />
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Total: ${totalPrice}
            </Typography>
            <Divider variant="fullWidth" />
            <Button variant="outlined" onClick={handleClose}>
              Keep shopping
            </Button>
            <Button
              variant="outlined"
              to="/checkout"
              component={Link}
              onClick={openCheckoutHandler}
            >
              Go to payment
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
