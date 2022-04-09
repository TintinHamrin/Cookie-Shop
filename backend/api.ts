import express from "express";

import { MongoClient, Db } from "mongodb";
import path from "path";
var app = express.Router();

var url = "mongodb+srv://tintin:tigernsar2022@cluster0.5c2mm.mongodb.net/test";

var client: MongoClient; // TODO type notate
var db: Db; // TODO type notate
var cartId: any; // TODO type notate;

// FIXME type notation
MongoClient.connect(url, (err, c) => {
  client = c!;
  db = client.db("CookieDB");
  if (err) throw err;
  console.log("Database created in the cloud!");
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
  if ("session" in cartId) {
    //TODO move req.cookies down here
    console.log("session cookie exists!"); //TODO also need to validate the cookie?
  } else res.status(403).send("no cookie found!");
  next();
};

// TODO change name of endpoint
app.get("/cartId", (req, res) => {
  //unelegant, should be when adding 1st item, could be middleware
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

module.exports = app;
