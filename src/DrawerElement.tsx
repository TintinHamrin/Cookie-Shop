import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonElement from './UI/ButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { menuSliceActions, RootState } from './store/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DrawerElement() {
  const menuSelector = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  const [chosenMenuItem, setChosenMenuItem] = useState('');

  const toggleDrawer = () => {
    console.log('closing');
    dispatch(menuSliceActions.toggleOpen(false));
  };

  const itemHandler = (index: number) => {
    if (index === 0) {
      console.log('prods');
      setChosenMenuItem('products');
    } else {
      console.log('about');
      setChosenMenuItem('about');
    }
  };

  return (
    <Drawer open={menuSelector} onClose={toggleDrawer}>
      <Box
        //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <List>
          <ListItem
            button
            key="products"
            onClick={(e: any) => {
              itemHandler(0);
            }}
            to="/products"
            component={Link}
          >
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            key="about"
            onClick={(e: any) => {
              itemHandler(1);
            }}
            to="/about"
            component={Link}
          >
            <ListItemText primary="About" />
          </ListItem>
        </List>
        <Divider />
        <ButtonElement onClick={toggleDrawer}>Close</ButtonElement>
      </Box>
    </Drawer>
  );
}
