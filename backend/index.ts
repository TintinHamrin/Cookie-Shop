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
MongoClient.connect(url, function (err: any, c: any) {
  client = c;
  db = client.db('CookieShop');
  if (err) throw err;
  console.log('Database created!');
});

app.get('/products', async (req, res) => {
  var cursor = db.collection('Products').find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

// TODO validate user input before insert
app.post('/cookie-suggestions', (req, res) => {
  db.collection('CustomerIdeas').insertOne(req.body);
  res.json('Thanks for your suggestion!');
});

// FIXME set cookie + validate req.body
// TODO Q: Why dont i get the type notation??
app.post('/cart-items', async (req, res) => {
  const cartId = req.cookies.session;
  const collection = db.collection('Carts');  // TODO Q: bad name as im now using simple date types db design?
  db.collection('Carts').insertOne({...req.body, cartId: cartId}); //TODO can i change this to var cartsCollection?
  res.json({cookie: cartId});  //TODO i should send back full cart details here?
});


app.get('/cart-items', async (req, res) => {
  const cartId = req.cookies.session;
  const collection = db.collection('Carts');
  const cursor = await collection.find({"cartId": cartId}); // TODO maybe not async?
  const fullCartData = await cursor.toArray();
  const itemsInCartQt = await cursor.count();
  try {
    res.json(itemsInCartQt);  // TODO now sending back only qt, better to ley frontend have it all yeah? 
  } catch (error) {
    console.log(error);
  }
});

// FIXME type notation
const validateCookie = (req: any, res: any, next: any) => {
  const cartId = req.cookies;
  if ('session' in cartId) {
    console.log('session cookie exists!'); //FIXME also need to validate the cookie? 
  } else res.status(403).send('no cookie found!');
  next()
};

// FIXME change name of endpoint
app.get('/cartId', (req, res) => {
  if (!req.cookies.session) {
    cartId = Math.random().toString();
    res.cookie('session', cartId) // TODO type notate
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
