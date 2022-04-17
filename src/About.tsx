import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, CardContent, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './About.scss';
import { ApiClient } from './ApiClient';

export default function About() {
  const [text, setText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const textInputHandler = (e: any) => {
    setText(e.target.value);
  };

  const sendDataToDb = () => {
    ApiClient.fetch('/cookie-suggestions', {
      method: 'POST',
      body: JSON.stringify({ pastry: text }),
    })
      .then((res) => res.json())
      .then((data) => setFeedbackText(data));
  };

  return (
    <div className="container">
      <Paper
        elevation={6}
        color="primary"
        style={{
          maxWidth: '50%',
        }}
      >
        <CardContent sx={{ backgroundColor: 'primary.main' }}>
          <Typography variant="h5">About the cookie shop!</Typography>
          <Typography variant="body1">
            For the love of the cookie we are here for you. Made with love,
            butter, egg and other divine ingredients our cakes has been voted
            the best in the country several times. Come by for a cup of joe and a
            slice of love.
          </Typography>
        </CardContent>
      </Paper>

      <Box
        color="secondary.main"
        className="box"
        style={{
          width: '50%',
          margin: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TextField
          sx={{ color: 'secondary.main' }}
          style={{ width: '75%' }}
          id="outlined-basic textInput"
          label="Missing a cookie? Tell us!"
          variant="filled"
          onChange={(e) => {
            textInputHandler(e);
          }}
        />
        <Button sx={{ color: 'secondary.main' }} onClick={sendDataToDb}>
          Click to add
        </Button>
        {feedbackText}
      </Box>
    </div>
  );
}
