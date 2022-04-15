import express, { Request, Response } from "express";
import { productModel } from "./database";
// import { MongoClient, Db } from "mongodb";
// import { Document, Model, model, Types, Schema, Query } from "mongoose";
// const mongoose = require("mongoose");
var app = express.Router();



// mongoose
//   .connect(
//     "mongodb+srv://tintin:tigernsar2022@cluster0.5c2mm.mongodb.net/CookieDB",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("inside mongoose");
//   })
//   .catch((err: any) => console.log("err", err));

// const cartSchema: Schema = mongoose.Schema({
//   productId: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   cartId: {
//     type: String,
//     required: true,
//   },
// });

// const productSchema: Schema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   img: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// const cartModel = mongoose.model("Cart", cartSchema, "Carts");
// const productModel = mongoose.model("Product", productSchema, "Products");

app.get("/products", async (req: Request, res: Response) => {
  const products = await productModel.find({});
  console.log(products);
  res.json(products);
});

// app.get("/getName/:id", async (req: Request, res: Response) => {
//   const params = parseInt(req.params.id);
//   console.log(params);
//   const document = await db.collection("Products").findOne({ _id: params });
//   res.json(document);
// });

// app.post("/cookie-suggestions", (req: Request, res: Response) => {
//   db.collection("CustomerIdeas").insertOne(req.body);
//   res.json("Thanks for your suggestion!");
// });

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
