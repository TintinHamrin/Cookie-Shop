import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import path from "path";
import express from "express";
// 

const router = require("./api");
const app = express();
// export const env = dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["sessionBaby"] }));
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req: any, res) => {
  req.sendFile(path.resolve(__dirname, "build", "/index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on port 3001");
});
