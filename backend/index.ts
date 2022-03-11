const express = require('express');

const app = express();

app.get('/hej', (req: any, res: any) => {
  console.log('hej baby!');
  res.send('from inside GET');
});

app.listen(3001, () => {
  console.log('listening on 3001!');
});

export {};
