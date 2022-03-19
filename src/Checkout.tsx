import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import ButtonElement from './UI/ButtonElement';

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
};

function Checkout() {
  const checkoutIsOpen = useSelector(
    (state: RootState) => state.checkout.isOpen
  );

  const openPaymentDetailsHandler = () => {
    console.log('opening payment details');
  };

  return (
    // <Fade in={checkoutIsOpen}>
    <Box sx={{ style: { style } }}>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        insert payment details
      </Typography>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        insert payment details
      </Typography>
      <ButtonElement>Keep shopping</ButtonElement>
      <Button variant="outlined" onClick={openPaymentDetailsHandler}>
        Pay
      </Button>
    </Box>
    // </Fade>
  );
}

export default Checkout;
