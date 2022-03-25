import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {
  cartSliceActions,
  checkoutSliceActions,
  RootState,
} from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import ButtonElement from './UI/ButtonElement';
import { Button, Dialog } from '@mui/material';
import Checkout from './Checkout';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CartListItem from './CartListItem';
import { List } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

  maxHeight: '400px',
  overflow: 'auto'
};

const listStyle = {
 
  maxHeight: '90%',
  overflow: 'auto'
};

export type Cart = {
_id: number,
carttId: number,
price: number,
};

export default function Cart() {
  const cartIsOpen = useSelector((state: RootState) => state.cart.isOpen);
  const checkoutIsOpen = useSelector(
    (state: RootState) => state.checkout.isOpen
  );
  const [fullCartDetails, setFullCartDetails] = useState<Array<Cart>>([])
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log('closing cart');
    dispatch(cartSliceActions.toggleOpen(false));
  };

  const openCheckoutHandler = () => {
    console.log('opening checkout');
    dispatch(checkoutSliceActions.toggleOpen(true));
    dispatch(cartSliceActions.toggleOpen(false));
  };

  // useEffect(() => { 
  //   (asyncfetch('/cart-items-detailed')
  //   .then ((res) => res.json())
  //   .then((data) => console.log(data)) // WORKS
  //   // console.log(fullCartDetails) //FIXME why an empty array?
  // }, []())

  useEffect(() => {
    (async () => {
      const data = await fetch('/cart-items-detailed');
      const fetchedProducts = await data.json();
      setFullCartDetails(fetchedProducts);
      console.log(fetchedProducts);
      console.log(fullCartDetails);
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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Your cart
            </Typography>
        <Box sx={listStyle}>
            {fullCartDetails.map((product) => (
          //    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          //    {product.price}
          //  </Typography>
          <CartListItem  />
            ))}
        </Box>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Items
            </Typography>
            <ButtonElement>Keep shopping</ButtonElement>
            {/* <Button variant="outlined" onClick={openCheckoutHandler}>
                Go to payment
              </Button> */}
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
