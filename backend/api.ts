import express, { NextFunction, Response, Request } from "express";
import { MongoClient, Db } from "mongodb";
const router = express.Router();

var url = "mongodb+srv://tintin:tigernsar2022@cluster0.5c2mm.mongodb.net/test";

var client: MongoClient; 
var db: Db;


MongoClient.connect(url, (err, c) => {
  client = c!;
  db = client.db("CookieDB");
  if (err) throw err;
  console.log("Database created in the cloud!");
});


router.get("/products", async (req: Request, res: Response) => {
  var cursor = db.collection("Products").find({});
  const allValues = await cursor.toArray();
  res.json(allValues);
});

router.get("/getName/:id", async (req: Request, res: Response) => {
  const params = parseInt(req.params.id);
  console.log(params);
  const document = await db.collection("Products").findOne({ _id: params });
  res.json(document);
});

router.post("/cookie-suggestions", (req, res) => {
  db.collection("CustomerIdeas").insertOne(req.body);
  res.json("Thanks for your suggestion!");
});

router.post("/cart-items", async (req: Request, res: Response) => {
  const cartId = req.cookies.session;
  const collection = db.collection("Carts"); //
  collection.insertOne({ ...req.body, cartId: cartId }); 
  res.json({ cookie: cartId }); 
});

router.get("/cart-items-detailed", async (req: Request, res: Response) => {
  const cartId = req.cookies.session;
  const collection = db.collection("Carts");
  const cursor = await collection.find({ cartId: cartId }); 
  const fullCartData = await cursor.toArray();
  const fullCartQt = await cursor.count(); 

  let sum = 0; 
  for (let i = 0; i < fullCartData.length; i++) {
    // TODO each or for loop, never this kind, reduce?
    sum += fullCartData[i].price;
  }

  try {
    res.json({ fullCart: fullCartData, Qt: fullCartQt, sum: sum.toFixed(2) }); //TODO qt -> fullcart.lenght on the client instead
  } catch (error) {
    console.log(error); // TODO send back respons
  }
});


router.get("/cartId", (req: Request, res: Response) => {
  if (!req.session) {
    req.session = {isLoggedIn: true}
    res.send("you are cookified!");
  } else {
    res.send("you are already authenticated!");
  }
});

// Not currently used
// const validateCookie = (req: Request, res: Response, next: NextFunction) => {
//   const cartId = req.session;
//   if ("session" in cartId) {
//     //TODO move req.cookies down here
//     console.log("session cookie exists!"); //TODO also need to validate the cookie?
//   } else res.status(403).send("no cookie found!");
//   next();
// };


module.exports = router;
