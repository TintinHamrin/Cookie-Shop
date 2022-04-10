import bodyParser from "body-parser";
import path from "path";
import express from "express";
var api = require("./api");
const app = express();

const cookieParser = require("cookie-parser");
// const path = require("path");
// const helmet = require("helmet");
// const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));
console.log('static pat:')
console.log(path.join(__dirname, "../build"));

app.use("/api/v1", api);
app.get("/", (req, res) => {
  console.log('in first get') 
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on 3001!");
});

app.get("/test1", (req, res) => {
  const testFolder = '../build';
  const fs = require('fs');
  console.log('in test1') 

  fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
  });
  
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

