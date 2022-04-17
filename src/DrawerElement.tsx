import { useDispatch, useSelector } from "react-redux";
import { menuSliceActions, RootState } from "./store/store";
import { Link } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DrawerElement() {
  const menuSelector = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(menuSliceActions.toggleOpen(false));
  };

 

  return (
    <Drawer open={menuSelector} onClose={toggleDrawer}>
      <Box
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <List>
          <ListItem
            button
            key="products"
            to="/products"
            component={Link}
          >
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            key="about"
            to="/about"
            component={Link}
          >
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
