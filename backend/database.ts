import { Schema } from "mongoose";
import dotenv from "dotenv";
const mongoose = require("mongoose");

dotenv.config();
//delete mongoose.connection.models["art"];

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("inside mongoose using .env");
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
  tasty: {
    type: Boolean,
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

const UserSchema: Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const pastrySuggestionSchema: Schema = mongoose.Schema({
  pastry: { type: String, required: true },
});

const cartModel = mongoose.model("Cart", cartSchema, "Carts");
const userModel = mongoose.model("User", UserSchema, "Users");
const productModel = mongoose.model("Product", productSchema, "Products");
const pastrySuggestionModel = mongoose.model(
  "PastrySuggestion",
  pastrySuggestionSchema,
  "CustomerIdeas"
);

export { productModel, cartModel, pastrySuggestionModel, userModel, db };
