const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
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
  db.collection('carts').insertOne(req.body);
  res.cookie('cookie', 'monster');
});

app.get('/getCartItemQt', async (req: any, res: any) => {
  const db = client.db('cookieShop'); //why do i need to do this in every request??
  const collection = db.collection('carts');
  const cursor = collection.find({});
  try {
    const itemsQt = await cursor.count();
    console.log('getting cartQt from database', itemsQt);
    res.json(itemsQt);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log('listening on 3001!');
});
