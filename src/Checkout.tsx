import {
  Backdrop,
  Box,
  Button,
  Card,
  Divider,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutSliceActions, RootState } from "./store/store";
import ButtonElement from "./UI/ButtonElement";

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
};

function Checkout() {
  const dispatch = useDispatch();
  const checkoutIsOpen = useSelector(
    (state: RootState) => state.checkout.isOpen
  );

  const openPaymentDetailsHandler = () => {
    console.log("opening payment details");
  };

  const handleClose = () => {
    console.log("closing cart");
    dispatch(checkoutSliceActions.toggleOpen(false));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={checkoutIsOpen}
      onClose={handleClose}
      onKeyDown={handleClose}
      onBackdropClick={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box color="secondary.main" sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Your cart
        </Typography>
        <Divider variant="fullWidth" />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>

        <Divider variant="fullWidth" />
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Total: x
        </Typography>
        <Divider variant="fullWidth" />
        <ButtonElement>Keep shopping</ButtonElement>
        <Button
          variant="outlined"
          // to="/checkout"
          // component={Link}
          // onClick={openCheckoutHandler}
        >
          Pay
        </Button>
      </Box>
    </Modal>
  );
}

export default Checkout;
