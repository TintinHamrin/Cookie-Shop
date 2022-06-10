import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Product, Cart, PastrySuggestion, User } from "./database/db-models";
import { genPassword } from "./passwordUtils";
export const router = express.Router();

declare module "express-session" {
  interface SessionData {
    cartId: string;
    tasty: boolean;
  }
}

router.get("/products", async (req: Request, res: Response) => {
  const products = await Product.find({});
  console.log("prods", products);
  res.json(products);
});

router.get("/product-name/:id", async (req: Request, res: Response) => {
  const params = parseInt(req.params.id);
  const document = await Product.findOne({ _id: params });
  res.json(document);
});

router.post("/cookie-suggestions", async (req: Request, res: Response) => {
  await PastrySuggestion.insertOne(req.body);
  res.send("ok");
});

router.post("/register", async (req: Request, res: Response) => {
  const { salt, hash } = genPassword(req.body.password);

  await User.insertOne({
    username: req.body.username,
    salt: salt,
    hash: hash,
  });
  res.json({ msg: "registered" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failure",
    successRedirect: "/success",
  })
);

router.post("/cart-item", setCartId, async (req: Request, res: Response) => {
  const { productId, price, tasty } = req.body;
  Cart.insertOne({
    cartId: req.session.cartId!,
    productId: productId,
    price: price,
    tasty: tasty,
  });
  res.json({ msg: "added" });
});

router.get("/cart-items", setCartId, async (req: Request, res: Response) => {
  const cartItems = await Cart.find({ cartId: req.session.cartId });

  let sum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    console.log(cartItems[i].price);
    sum += cartItems[i].price;
  }
  res.json({ cartItems: cartItems, sum: sum });
});

function setCartId(req: Request, res: Response, next: NextFunction) {
  if (!req.session.cartId) {
    req.session.cartId = Math.random().toString();
  }
  next();
}

router.get("*", (req: any, res) => {
  res.status(404).send();
});
