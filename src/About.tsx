import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CardContent, Typography } from '@mui/material';

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3}>
        <CardContent>
          <Typography>About TT's cookie shop!</Typography>
        </CardContent>
      </Paper>
    </Box>
  );
}
