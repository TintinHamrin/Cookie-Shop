import { MongoClient, Db } from "mongodb";
import { Document, Model, model, Types, Schema, Query } from "mongoose";
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://tintin:tigernsar2022@cluster0.5c2mm.mongodb.net/CookieDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("inside mongoose");
  })
  .catch((err: any) => console.log("err", err));

const db = mongoose.connection;

const cartSchema: Schema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
  },
});

const productSchema: Schema = mongoose.Schema({
  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const pastrySuggestionSchema: Schema = mongoose.Schema({
  pastry: { type: String, required: true },
});

const cartModel = mongoose.model("Cart", cartSchema, "Carts");
const productModel = mongoose.model("Product", productSchema, "Products");
const pastrySuggestionModel = mongoose.model(
  "PastrySuggestion",
  pastrySuggestionSchema,
  "CustomerIdeas"
);

export { productModel, cartModel, pastrySuggestionModel, db };
