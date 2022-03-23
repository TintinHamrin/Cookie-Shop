import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
const { MongoClient } = require('mongodb');
var url =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.2';

var client: any;
var db: any;
var sessId: string;

// FIXME type notation
// connect client and db
MongoClient.connect(url, function (err: any, c: any) {
  client = c;
  db = client.db('cookieShop');
  if (err) throw err;
  console.log('Database created!');
});

// get products to products page
app.get('/products', async (req, res) => {
  var cursor = db.collection('products').find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

// TODO validate user input before insert
//  post cookie suggestion from users to db.
app.post('/cookie-suggestions', (req, res) => {
  console.log(req.body);
  db.collection('CustomerIdeas').insertOne(req.body);
  res.json('Thanks for your suggestion!');
});

// TODO CRUD operations
// FIXME database normalization: remove product name / price from cart (use product_id)

// Model relationships
// Product

// Cart
// 1 cart => many cart Products
// CartProducts | CartItems
//

// Domain Model
// classes in typescript

// API model - REST
// /resourceName/operation (non-defult)
// 1) create - POST /resourceName
// 2) read - GET /resourceName/:id
// 3) delete - DELETE /resouceName/:id
// 4) update - PUT /resourcename/:id
// 5) custom - ANY /resourcename/:id/operation /resourcename/operation
// naming
// resouceName = cart | carts | cartItem

// Database model
//

// API DESIGN:
// app.post('/cart-items'
// app.get('cart-items')
// app.delete ('cart-items/:id)
// app.update ('cart-items/:id) - count

// FIXME set cookie + validate req.body
// add product to db + setting a cookie
app.post('/cart-items', async (req, res) => {
  const cartId = req.body.cartId;
  const collection = db.collection('carts');
  const query = { cartId: cartId };
  const cartIdCursor = collection.find(query);
  const doesCartIdExist = await cartIdCursor.toArray(); // TODO rename

  if (doesCartIdExist.length === 0) {
    db.collection('carts').insertOne(req.body); //TODO can i change this to var cartsCollection?
  } else {
    db.collection('carts').updateOne(query);
  }
  const cursor = await collection.find({});
  const cartItemsArray = await cursor.toArray();
  res.json({ cart: cartItemsArray });
});

// get saved products from cart/db
app.get('/cart-items', async (req, res) => {
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

// checks if the sessId already exists
// app.get('/cartId', async (req, res) => {
//   const cartId = req.body.cartId;
//   const collection = db.collection('carts');
//   const cursor = collection.find({ cartId: cartId });
//   const doesCartIdExist = await cursor.toArray();
//   console.log('array:', doesCartIdExist); //SENDING BACK ARRAY OK
//   res.json(doesCartIdExist);
// });

// FIXME type notation
//middleware to be used when i need to validate the cookie
const validateCookie = (req: any, res: any, next: any) => {
  const { cookies } = req;
  if ('session' in cookies) {
    console.log('session cookie exists!');
    if (cookies.session === sessId) {
      console.log('you can enter');
      next();
    } else res.status(403).send('no cookie found!');
  } else res.status(403).send('no cookie found!');
};

// FIXME change name of endpoint
app.get('/cookie', (req, res) => {
  if (!req.cookies) {
    const mathRand = Math.random().toString();
    sessId = mathRand;
    res.cookie('session', sessId);
    res.send('you are cookified!');
  } else {
    res.send('you are already authenticated!');
  }
});

app.get('/cookie-delete', (req, res) => {
  res.clearCookie('session');
  res.json('cookie is gone!');
});

app.get('/cookie-validate', validateCookie, (req, res) => {
  const cookies = req.cookies;
  res.json({ cookie: cookies });
});

// start listening on port 3001
app.listen(3001, () => {
  console.log('listening on 3001!');
});
