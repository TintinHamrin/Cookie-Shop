import express, { NextFunction, Request, Response } from "express";
//import session, { Session } from "express-session";
import {
  cartModel,
  pastrySuggestionModel,
  productModel,
  userModel,
} from "./database";
var app = express.Router();

// interface SessionRequest extends Request {
//   session: SessionData;
// }

// interface SessionData extends Session {
//   cartId: string;
// }

declare module "express-session" {
  interface SessionData {
    cartId: string;
    tasty: boolean;
  }
}

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
  res.send("ok");
});

app.post("/register", async (req: Request, res: Response) => {
  await userModel.create(req.body);
  res.json({ msg: "registered" });
});

app.post("/cart-item", setCartId, async (req: Request, res: Response) => {
  const { productId, price, tasty } = req.body;

  cartModel.create({
    cartId: req.session.cartId,
    productId: productId,
    price: price,
    tasty: tasty,
  });
  res.json({ msg: "added" });
});

app.get("/cart-items", setCartId, async (req: Request, res: Response) => {
  const cartItems = await cartModel.find({ cartId: req.session.cartId });

  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    console.log(cartItems[i].price);
    sum += cartItems[i].price;
  }
  res.json({ cartItems: cartItems, sum: sum });
});

function setCartId(req: Request, res: Response, next: NextFunction) {
  if (req.session.cartId) {
    console.log("sessId", req.sessionID);
    console.log("cartId", req.session.cartId);
  } else {
    req.session.cartId = Math.random().toString();
    req.session.tasty = true;
  }
  next();
}

// app.get("/cart-id", (req, res) => {
//   if (req.session && req.session.cartId) {
//     console.log("already set");
//   } else {
//     req.session.cartId = Math.random().toString();
//   }
//   res.json({ msg: "set cookie" });
// if (req.session && req.session.t) {
//   console.log(req.session.cookie);
// } else {
//   // req.session.q = { session: Math.random().toString() };
//   req.session.t = res.send({ "you are cookified!:": req.session });
//   console.log(req.session.cookie);
// }
// });

app.get("*", (req: any, res) => {
  res.status(404).send();
});
module.exports = app;
