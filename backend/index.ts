const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { MongoClient } = require('mongodb');
var url =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.2';

var client: any;

MongoClient.connect(url, function (err: any, c: any) {
  client = c;
  if (err) throw err;
  console.log('Database created!');
});

// const db = client.getDB('cookieShop');

app.get('/products', async (req: any, res: any) => {
  const db = client.db('cookieShop');
  var cursor = db.collection('products').find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

app.post('/postData', (req: any, res: any) => {
  console.log('test');
  console.log(req.body);
  const db = client.db('cookieShop'); //why do i need to do this in every request??
  db.collection('CustomerIdeas').insertOne(req.body);
});

app.post('/addToCart', async (req: any, res: any) => {
  const db = client.db('cookieShop');
  const carts = db.collection('carts');
  const storedId = carts.find({ _id: req.body.id });
  const doesCartAlreadyExist = await storedId.count();
  // if (doesCartAlreadyExist === 0) {
  db.collection('carts').insertOne(req.body);
  // } else {
  //   const oldItemsCursor = carts.find({ _id: {} });
  //   const oldItems = await oldItemsCursor.toArray();
  //   db.carts.updateOne(
  //     {
  //       _id: req.body.id,
  //     },
  //     {
  //       $set: { item: req.body.item },
  //     }
  //   );
  // }
  // const oldItemsCursor = await storedId.toArray();
  // console.log(oldItemsCursor);
  // console.log(doesCartAlreadyExist);
});

app.get('/getCartItemQt', async (req: any, res: any) => {
  console.log('mmm');
  const db = client.db('cookieShop'); //why do i need to do this in every request??
  const collection = db.collection('carts');
  const cursor = collection.find({});
  try {
    // const itemsQtArray = await cursor.toArray();
    const itemsQt = await cursor.count();
    console.log(itemsQt);
    res.json(itemsQt);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log('listening on 3001!');
});
