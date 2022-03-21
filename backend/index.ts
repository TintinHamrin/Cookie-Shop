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
  // res.cookie('session_id', 123456);
  res.clearCookie('session_id');
  try {
    const carts = db.collection('carts');
    db.collection('carts').insertOne(req.body);
    const cursor = await carts.find({});
    const cartItemsArray = await cursor.toArray();
    res.json({ response: cartItemsArray });
  } catch (error) {
    res.status(500).json('sorry, something went wrong!');
  }
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

// FIXME type notation
//middleware to be used when i need to validate the cookie
const validateCookie = (req: any, res: any, next: any) => {
  const { cookies } = req;
  if ('session' in cookies) {
    console.log('session cookie exists!');
    if (cookies.session === '1345') {
      console.log('you can enter');
      next();
    } else res.status(403).send('no cookie found!');
  } else res.status(403).send('no cookie found!');
};

app.get('/cookie', (req, res) => {
  res.cookie('session', '1345');
  res.send('you are cookified!');
});

// app.get('/get-cookie', (req, res) => {
//   console.log(req.cookies);
//   res.send(req.cookies);
// });

app.get('/cookie-delete', (req, res) => {
  res.clearCookie('session');
  res.json('cookie is gone!');
});

app.get('/cookie-validate', validateCookie, (req, res) => {
  res.json('cookie is valid!');
});

// start listening on port 3001
app.listen(3001, () => {
  console.log('listening on 3001!');
});
