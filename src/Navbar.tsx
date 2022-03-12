import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, cartSliceActions, RootState } from './store/store';

function Navbar() {
  const [value, setValue] = React.useState('one');
  const cartIsOpen = useSelector((state: RootState) => state.cart.isOpen);

  const cartDispatch = useDispatch<AppDispatch>();

  const openCartHandler = () => {
    console.log('opening');
    cartDispatch(cartSliceActions.toggleOpen(true));
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Products" to="/products" component={Link} />
        <Tab value="two" label="Info" />
        <Tab
          value="three"
          label="Cart"
          to="/cart"
          component={Link}
          onClick={openCartHandler}
        />
        )
      </Tabs>
    </Box>
  );
}
export default Navbar;
