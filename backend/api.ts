import express, { Request, Response } from "express";
import { db, pastrySuggestionModel, productModel } from "./database";
var app = express.Router();

app.get("/products", async (req: Request, res: Response) => {
  const products = await productModel.find({});
  console.log(products);
  res.json(products);
});

app.get("/product-name/:id", async (req: Request, res: Response) => {
  //TODO what does this do?
  const params = parseInt(req.params.id);
  const document = await productModel.findOne({ _id: params });
  res.json(document);
});

// app.post("/cookie-suggestions", (req: Request, res: Response) => {
//   db.collection("CustomerIdeas").insertOne(req.body);
//   res.json("Thanks for your suggestion!");
// });

app.post("/cookie-suggestions", async (req: Request, res: Response) => {
  await pastrySuggestionModel.create(req.body);
});

// app.post("/cart-items", async (req: Request, res: Response) => {
//   if (req.session && req.session.sessionId) {
//     const collection = db.collection("Carts"); //
//     collection.insertOne({ ...req.body, cartId: req.session.sessionId });
//     res.json({ cookie: req.session.sessionId });
//   }
// });

// app.get("/cart-items", async (req: Request, res: Response) => {
//   if (req.session && req.session.sessionId) {
//     const collection = db.collection("Carts");
//     const cursor = await collection.find({ cartId: req.session.sessionId });
//     const fullCartData = await cursor.toArray();
//     const fullCartQt = await cursor.count();

//     let sum = 0;
//     for (let i = 0; i < fullCartData.length; i++) {
//       sum += fullCartData[i].price;
//     }
//     res.json({ fullCart: fullCartData, Qt: fullCartQt, sum: sum.toFixed(2) });
//   }
// });

app.get("/cart-id", (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    console.log(req.session.sessionId);
  } else {
    req.session = { sessionId: Math.random().toString() };
    res.send({ "you are cookified!:": req.session });
  }
});

module.exports = app;
