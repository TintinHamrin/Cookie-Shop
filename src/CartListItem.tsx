import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Cart} from './Cart';
import { useEffect, useState } from 'react';
import { Product } from './Products';

export default function CartListItem(props: Cart) { //FIXME what diff is it when i write typeof Cart?
  const [productName, setProductName] = useState()
  const [imgPath, setImgPath] = useState()


    useEffect(() => { // TODO dont go to db, info already exists
        (async () => {
          const data = await fetch(`/getName/${props.productId}`); // TODO rename
          const fetchedProducts = await data.json();
         setProductName(fetchedProducts.name)
         setImgPath(fetchedProducts.img)
        })();
      }, []);

    return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="image of product" src={`/assets/${imgPath}.jpg`} />
        </ListItemAvatar>
        <ListItemText
          primary={productName} 
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >{props.price}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    <Divider variant="inset" />
    </>
  );
}
