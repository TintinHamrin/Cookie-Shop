import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import path from "path";
import express from "express";
import dotenv from "dotenv";

const router = require("./api");
const app = express();
dotenv.config();

export interface ProcessEnv {
  [key: string]: string | undefined
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["sessionBaby"] }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));
console.log('static pat:')
console.log(path.join(__dirname, "/../build"));

// app.use("/api/v1", router);
app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on port 3001");
});
