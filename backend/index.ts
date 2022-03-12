const express = require('express');
const app = express();

app.get('/get', (req: any, res: any) => {
  console.log('get me baby!!');
  res.json([
    {
      id: 1,
      url: '../assets/gaby-dyson-QX814A1w3j4-unsplash.jpg',
    },
    {
      id: 2,
      url: '../assets/james-coleman-5HR1gItc7Gs-unsplash.jpg',
    },
    {
      id: 3,
      url: '../assets/leo-roza-y6BYMYP3vD4-unsplash.jpg',
    },
    {
      id: 4,
      url: '../assets/yosep-sugiarto-DE-ZospqOqU-unsplash.jpg',
    },
  ]);
});

app.listen(3001, () => {
  console.log('listening on 3001!!!');
});
