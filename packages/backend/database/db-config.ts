import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Papr from "papr";

dotenv.config();

export let client: MongoClient;
const papr = new Papr();

export async function connect() {
  client = await MongoClient.connect(`${process.env.DB_URL}`);
  papr.initialize(client.db("CookieDB"));
  await papr.updateSchemas();
}

export async function disconnect() {
  await client.close();
}

export default papr;
