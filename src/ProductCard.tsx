import * as React from 'react';
import './ProductCard.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from './Products';

export default function ProductCard(props: Product) {
  return (
    <Card sx={{ maxWidth: 150 }} className="card">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {props.img}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
}
