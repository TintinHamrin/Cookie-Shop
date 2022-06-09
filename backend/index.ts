import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import path from "path";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
//

const router = require("./api");
const app = express();
// export const env = dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieSession({ keys: ["sessionBaby"] }));

// const sessionStore = new MongoStore({
//   mongooseConnection: process.env.DB_URL,
// });

app.use(
  session({
    genid: function (req) {
      return Math.random().toString(); // use UUIDs for session IDs
    },
    secret: //in env
    resave: false,
    store: MongoStore.create({
      mongoUrl:
       //in env
      collectionName: "sessions",
    }),
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req: any, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on port 3001");
});
