import SchemaBuilder from "@pothos/core";
import { PastrySuggestion, Product } from "../database/db-models";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";

const builder = new SchemaBuilder({
  plugins: [SimpleObjectsPlugin],
});

const productType = builder.simpleObject("Products", {
  fields: (t) => ({
    _id: t.float(),
    name: t.string(),
    img: t.string(),
    description: t.string(),
    price: t.float(),
  }),
});

// const userType = builder.simpleObject("Products", {
//   fields: (t) => ({
//     username: t.string(),
//     password: t.string(), // take away in production!!!
//     salt: t.string(),
//     hash: t.string(),
//   }),
// });

builder.queryType({
  fields: (t) => ({
    products: t.field({
      type: productType,

      resolve: async () => {
        const products = await Product.find({});
        const prod = products[0]!;
        return {
          _id: prod._id!,
          name: prod.name!,
          img: prod.img!,
          description: prod.description!,
          price: prod.price!,
        };
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    cookieSuggestion: t.string({
      args: {
        suggestion: t.arg.string(),
      },
      resolve: async (parent, { suggestion }) => {
        await PastrySuggestion.insertOne({ pastry: suggestion! });
        return "thank you";
      },
    }),
  }),
});

export const schema = builder.toSchema({});
