import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Papr from "papr";

dotenv.config();

export let client: MongoClient;
const papr = new Papr();

export async function connect(): Promise<void> {
  client = await MongoClient.connect(
    "mongodb+srv://cookieweb:PwkUWTu6JCsmHc61@cluster0.5c2mm.mongodb.net/CookieDB"
  );
  papr.initialize(client.db("CookieDB"));

  //await papr.updateSchemas();
}

export async function disconnect(): Promise<void> {
  await client.close();
}

export default papr;
