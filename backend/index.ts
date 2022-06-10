import bodyParser from "body-parser";
import path from "path";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport, { Passport } from "passport";
import { PassportAuth } from "./passport";

import { router } from "./api";
import { connect } from "./database/db-config";
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    genid: function (req) {
      return Math.random().toString(); // use UUIDs for session IDs
    },
    secret: "keyboard cat",
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
PassportAuth.initMiddleware(app);
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req: any, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  connect();
  console.log("listening on port 3001");
});
