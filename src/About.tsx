import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, CardContent, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './About.scss';

export default function About() {
  const [text, setText] = useState('');

  //   const textInputField = document.querySelector('#textInput'!);
  //   const textInput = textInputField!.value;

  const textInputHandler = (e: any) => {
    setText(e.target.value);
    console.log(text);
  };

  const sendDataToDb = () => {
    console.log('sending to db');
    fetch('/postData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ cookieIWantTooSee: text }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="container">
      {/* <Box
        className="box"
        sx={{
          // display: 'flex',
          // flexWrap: 'wrap',
          // justifyContent: 'center',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      > */}
      <Paper
        elevation={6}
        style={{
          backgroundColor: 'rgba(238, 178, 181, 0.8)',
          color: 'black',
          maxWidth: '50%',
        }}
      >
        <CardContent>
          <Typography variant="h5">About the cookie shop!</Typography>
          <Typography variant="body1">
            For the love of the cookie we are here for you. Made with love,
            butter, egg and other divine ingredients out cakes has been voted
            the best in the county several times. Come by for a cup of joe and a
            slice of love.
          </Typography>
        </CardContent>
      </Paper>
      {/* </Box> */}

      <Box
        className="box"
        style={{
          backgroundColor: 'rgba(238, 178, 181, 0.8)',
          color: 'black',
          width: '50%',
          margin: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        // sx={{
        //   display: 'flex',
        //   flexWrap: 'wrap',
        //   justifyContent: 'center',
        // }}
      >
        <TextField
          style={{ width: '75%', color: 'black' }}
          id="outlined-basic textInput"
          label="Missing a cookie? Tell us!"
          variant="filled"
          onChange={(e) => {
            textInputHandler(e);
          }}
        />
        <Button onClick={sendDataToDb}>Click to add</Button>
      </Box>
    </div>
  );
}
