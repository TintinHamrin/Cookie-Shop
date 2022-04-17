import express, { Request, Response } from "express";
import path from "path";
import { cartModel, db, pastrySuggestionModel, productModel } from "./database";
var app = express.Router();

app.get("/products", async (req: Request, res: Response) => {
  const products = await productModel.find({});
  console.log("prods", products);
  res.json(products);
});

app.get("/product-name/:id", async (req: Request, res: Response) => {
  const params = parseInt(req.params.id);
  const document = await productModel.findOne({ _id: params });
  res.json(document);
});

app.post("/cookie-suggestions", async (req: Request, res: Response) => {
  await pastrySuggestionModel.create(req.body);
});

app.post("/cart-item", async (req: Request, res: Response) => {
  const { productId, price } = req.body;
  if (req.session && req.session.sessionId) {
    cartModel.create({
      cartId: req.session.sessionId,
      productId: productId,
      price: price,
    });
    res.json({ cookie: req.session.sessionId });
  }
});

app.get("/cart-items", async (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    const cartItems = await cartModel.find({ cartId: req.session.sessionId });
    console.log(cartItems);

    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      console.log(cartItems[i].price);
      sum += cartItems[i].price;
    }
    res.json({ cartItems: cartItems, sum: sum });
  } else {
    res.json({ cartItems: [], sum: 0 });
  }
});

app.get("/cart-id", (req: Request, res: Response) => {
  if (req.session && req.session.sessionId) {
    console.log(req.session.sessionId);
  } else {
    req.session = { sessionId: Math.random().toString() };
    res.send({ "you are cookified!:": req.session });
    console.log(req.session.sessionId);
  }
});

app.get("*", (req: any, res) => {
  req.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
