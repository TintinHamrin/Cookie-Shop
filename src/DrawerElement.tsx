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

export default function DrawerElement() {
  const menuSelector = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    console.log('closing');
    dispatch(menuSliceActions.toggleOpen(false));
  };

  const itemHandler = (index: number) => {
    if (index === 0) {
      console.log('prods');
    } else {
      console.log('about');
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
          {['Products', 'About'].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={(e) => {
                itemHandler(index);
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ButtonElement onClick={toggleDrawer}>Close</ButtonElement>
      </Box>
    </Drawer>
  );
}
