import { useDispatch, useSelector } from "react-redux";
import { checkoutSliceActions, RootState } from "./store/store";
//MUI
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

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

export default function Checkout() {
  const dispatch = useDispatch();
  const checkoutIsOpen = useSelector(
    (state: RootState) => state.checkout.isOpen
  );

  const openPaymentHandler = () => {
    //TODO add paypal
  };

  const handleClose = () => {
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
      <Box sx={style}>
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
          <TextField id="filled-basic" label="Full name" variant="filled" />
          <TextField id="filled-basic" label="Address" variant="filled" />
          <TextField id="filled-basic" label="Email" variant="filled" />
          <h1>test</h1>
        </Box>

        <Divider variant="fullWidth" />
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Total: $
        </Typography>
        <Divider variant="fullWidth" />
        <Button variant="outlined" onClick={handleClose}>
          Keep shopping
        </Button>
        <Button
          variant="outlined"
          to="/checkout"
          component={Link}
          onClick={openPaymentHandler}
        >
          Pay with PayPal
        </Button>
        <button>test</button>
      </Box>
    </Modal>
  );
}
