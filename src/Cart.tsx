import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { cartSliceActions, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Cart() {
  const cartIsOpen = useSelector((state: RootState) => state.cart.isOpen);
  const cartDispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleClose = () => {
    console.log('closing cart');
    cartDispatch(cartSliceActions.toggleOpen(false));
  };

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
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Items
            </Typography>
            <ButtonElement>Keep shopping</ButtonElement>
            <ButtonElement>Go to payment</ButtonElement>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
