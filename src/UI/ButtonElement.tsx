import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonElement(props: any) {
  return <Button variant="contained">{props.children}</Button>;
}
