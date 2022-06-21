import { buildSchema } from "graphql";
import * as fs from "fs";
import path from "path";

const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8")
);

export default schema;
