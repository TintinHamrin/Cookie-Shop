import bodyParser from "body-parser";
import path from "path";
import express from "express";
var api = require('./api');
const app = express();

const cookieParser = require("cookie-parser");
// const path = require("path");
// const helmet = require("helmet");
// const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("../build"));


app.use("/api/v1", api);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on 3001!");
});


