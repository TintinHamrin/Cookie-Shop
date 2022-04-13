import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import path from "path";
import express from "express";

const router = require("./api");
const app = express();

// const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["session", "session2", "session3"] }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));
console.log('static pat:')
console.log(path.join(__dirname, "/../build"));

app.use("/api/v1", router);
app.get("* ", (req, res) => {
  console.log('in first get') 
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on 3001");
});
