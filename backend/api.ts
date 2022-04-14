import express, { Request, Response } from "express";
import { MongoClient, Db } from "mongodb";
var app = express.Router();

var url = "mongodb+srv://tintin:tigernsar2022@cluster0.5c2mm.mongodb.net/test";

var client: MongoClient;
var db: Db;

MongoClient.connect(url, (err, c) => {
  client = c!;
  db = client.db("CookieDB");
  if (err) throw err;
  console.log("Database created in the cloud!");
});

app.get("/products", async (req: Request, res: Response) => {
  var cursor = db.collection("Products").find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

app.get("/getName/:id", async (req: Request, res: Response) => {
  const params = parseInt(req.params.id);
  console.log(params);
  const document = await db.collection("Products").findOne({ _id: params });
  res.json(document);
});

app.post("/cookie-suggestions", (req: Request, res: Response) => {
  db.collection("CustomerIdeas").insertOne(req.body);
  res.json("Thanks for your suggestion!");
});

app.post("/cart-items", async (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    const collection = db.collection("Carts"); //
    collection.insertOne({ ...req.body, cartId: req.session.sessionId });
    res.json({ cookie: req.session.sessionId });
  }
});

app.get("/cart-items", async (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    const collection = db.collection("Carts");
    const cursor = await collection.find({ cartId: req.session.sessionId });
    const fullCartData = await cursor.toArray();
    const fullCartQt = await cursor.count();

    let sum = 0;
    for (let i = 0; i < fullCartData.length; i++) {
      sum += fullCartData[i].price;
    }
    res.json({ fullCart: fullCartData, Qt: fullCartQt, sum: sum.toFixed(2) });
  }
});

app.get("/cart-id", (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    console.log(req.session.sessionId);
  } else {
    req.session = { sessionId: Math.random().toString() };
    res.send({ "you are cookified!:": req.session });
  }
});

module.exports = app;
