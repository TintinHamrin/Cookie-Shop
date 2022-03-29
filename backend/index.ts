import express from "express";
import { MongoClient, Db } from "mongodb";
import bodyParser from "body-parser";
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('build'))
app.get('*', (req: any, res) => {
  req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
app.use(helmet());

app.use(
  createProxyMiddleware("/*", { target: "http://localhost:3001" })
);


const port = process.env.PORT || 3001;
var url =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.2";

var client: MongoClient; // TODO type notate
var db: Db; // TODO type notate
var cartId: any; // TODO type notate;

// FIXME type notation
MongoClient.connect(url, (err, c) => {
  client = c!;
  db = client.db("CookieShop");
  if (err) throw err;
  console.log("Database created!");
});

app.get("/products", async (req, res) => {
  var cursor = db.collection("Products").find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

app.get("/getName/:id", async (req, res) => {
  // TODO rename /products/:id
  const params = parseInt(req.params.id);
  console.log(params);
  const document = await db.collection("Products").findOne({ _id: params });
  res.json(document);
});

// TODO validate user input before insert
app.post("/cookie-suggestions", (req, res) => {
  db.collection("CustomerIdeas").insertOne(req.body);
  res.json("Thanks for your suggestion!");
});

// TODO validate req.body
// FIXME Q: Why dont i get the type notation??
app.post("/cart-items", async (req, res) => {
  const cartId = req.cookies.session;
  const collection = db.collection("Carts"); //
  collection.insertOne({ ...req.body, cartId: cartId }); //TODO can i change this to var cartsCollection?
  res.json({ cookie: cartId }); //TODO i should send back full cart details here?
});

app.get("/cart-items-detailed", async (req, res) => {
  //take awau det.
  const cartId = req.cookies.session;
  const collection = db.collection("Carts");
  const cursor = await collection.find({ cartId: cartId }); // TODO maybe not async?
  const fullCartData = await cursor.toArray();
  const fullCartQt = await cursor.count(); //change to length???

  let sum = 0; // FIXME good decision to have in backend?
  for (let i = 0; i < fullCartData.length; i++) {
    // TODO each or for loop, never this kind
    console.log("?"); // TODO reduce function, look up
    sum += fullCartData[i].price;
  }

  try {
    // TODO try catch is stupid
    res.json({ fullCart: fullCartData, Qt: fullCartQt, sum: sum.toFixed(2) }); //TODO qt -> fullcart.lenght on the client instead
  } catch (error) {
    console.log(error); // TODO send back respons
  }
});

// TODO type notation
const validateCookie = (req: any, res: any, next: any) => {
  const cartId = req.cookies;
  if ("session" in cartId) { //TODO move req.cookies down here
    console.log("session cookie exists!"); //TODO also need to validate the cookie?
  } else res.status(403).send("no cookie found!");
  next();
};

// TODO change name of endpoint
app.get("/cartId", (req, res) => {  //unelegant, should be when adding 1st item, could be middleware
  if (!req.cookies.session) {
    cartId = Math.random().toString();
    res.cookie("session", cartId);
    res.send("you are cookified!");
  } else {
    res.send("you are already authenticated!");
  }
});

app.get("/cartId-delete", (req, res) => {
  res.clearCookie("session");
  res.json("cookie is gone!");
});

app.get("/cartId-validate", validateCookie, (req, res) => {
  const cartId = req.cookies.session;
  res.json({ cookie: cartId });
});

app.listen(port, () => {
  console.log("listening on 3001!");
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
