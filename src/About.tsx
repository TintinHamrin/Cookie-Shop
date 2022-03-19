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
      <Box
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
      >
        <Paper elevation={3}>
          <CardContent>
            <Typography>About TT's cookie shop!</Typography>
          </CardContent>
        </Paper>
      </Box>

      <Box
        className="box"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TextField
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
