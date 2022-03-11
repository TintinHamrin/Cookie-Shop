const express = require('express');
const app = express();

app.get('/get', (req: any, res: any) => {
  console.log('get me baby!!');
  res.json({ user: 'tintin' });
});

app.listen(3001, () => {
  console.log('listening on 3001!!!');
});
