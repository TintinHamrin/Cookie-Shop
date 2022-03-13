const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
var url =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.2';

var client: any;

MongoClient.connect(url, function (err: any, c: any) {
  client = c;
  if (err) throw err;
  console.log('Database created!');
});

app.get('/products', async (req: any, res: any) => {
  const db = client.db('cookieShop');
  var cursor = db.collection('products').find({});

  const allValues = await cursor.toArray();
  res.json(allValues);
});

app.listen(3001, () => {
  console.log('listening on 3001!');
});
