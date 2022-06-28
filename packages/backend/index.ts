import bodyParser from "body-parser";
import path from "path";
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { PassportAuth } from "./passport";
import { router } from "./api";
import { connect } from "./database/db-config";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import { graphqlHTTP } from "express-graphql";
//import graphqlSchema from "./graphql/schema";
import graphqlResolvers from "./graphql/resolvers";
import { schema } from "./graphql/pSchema";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
const app = express();
dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

const redisClient = new Redis(process.env.REDIS_URL!);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    genid: function (req) {
      return Math.random().toString(); // use UUIDs for session IDs
    },
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    store: new (RedisStore(session))({ client: redisClient }),
    saveUninitialized: false,
  })
);

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true,
//   })
// );

app.use(bodyParser.json());
PassportAuth.initMiddleware(app);
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "../../build")));

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err: any, req: any, res: any, next: any) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("*", (req: any, res) => {
  res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  connect();
  console.log("listening on port 3001");
});

export function dummyFunction(num1: number, num2: number) {
  return num1 + num2;
}
