import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());
const { MongoClient } = require('mongodb');
var url =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.2';

var client: any; // TODO type notate
var db: any;  // TODO type notate
var cartId: any; // TODO type notatestring;

// FIXME type notation
// connect client and db
MongoClient.connect(url, function (err: any, c: any) {
  client = c;
  db = client.db('CookieShop');
  if (err) throw err;
  console.log('Database created!');
});

// get products to products page
app.get('/products', async (req, res) => {
  var cursor = db.collection('Products').find({});
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

// FIXME set cookie + validate req.body
// TODO Q: Why dont i get the type notation??
app.post('/cart-items', async (req, res) => {
  const cartId = req.cookies.session;
  const collection = db.collection('Carts');  // TODO Q: bad name as im now using simple date types db design?
  db.collection('Carts').insertOne({...req.body, cartId: cartId}); //TODO can i change this to var cartsCollection?
  res.json({cookie: cartId});
});


app.get('/cart-items', async (req, res) => {
  const cartId = req.cookies.session;
  console.log('cartId:', cartId)
  const collection = db.collection('Carts');
  const cursor = await collection.find({}); // TODO maybe not async?
  const fullCartData = await cursor.toArray();
  const itemsInCartQt = await cursor.count();
  try {
    console.log(fullCartData)
    console.log(itemsInCartQt)
    res.json({items: fullCartData});
  } catch (error) {
    console.log(error);
  }
});


// FIXME type notation
const validateCookie = (req: any, res: any, next: any) => {
  const cartId = req.cookies;
  if ('session' in cartId) {
    console.log('session cookie exists!');
    // if (cartId.session === cartId) {   // TODO type notate)
    //   console.log('you can enter');
    //   next();
    // } else res.status(403).send('no cookie found!');
  } else res.status(403).send('no cookie found!');
  next()
};

// FIXME change name of endpoint
app.get('/cartId', (req, res) => {
  if (!req.cookies) {
    const mathRand = Math.random().toString();
    cartId = mathRand; // TODO type notate = mathRand;
    res.cookie('session', cartId) // TODO type notate);
    res.send('you are cookified!');
  } else {
    res.send('you are already authenticated!');
  }
});

app.get('/cartId-delete', (req, res) => {
  res.clearCookie('session');
  res.json('cookie is gone!');
});

app.get('/cartId-validate', validateCookie, (req, res) => {
  const cartId = req.cookies;
  res.json({ cookie: cartId });
});

// start listening on port 3001
app.listen(3001, () => {
  console.log('listening on 3001!');
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
