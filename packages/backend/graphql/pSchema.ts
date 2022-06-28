import SchemaBuilder from "@pothos/core";
import { PastrySuggestion, Product } from "../database/db-models";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
// import Product from "../lib/classes";

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

// builder.objectType(Product, {
//   name: "Product",
//   fields: (t) => ({
//     _id: t.int,
//     name: t.string,
//     img: t.string,
//     description: t.string,
//     price: t.int,
//   }),
//   resolve: () => "hej",
// });

builder.queryType({
  fields: (t) => ({
    products: t.field({
      type: [productType],

      resolve: async () => {
        const products = await Product.find({});
        //const prod = products;
        // return {
        //   _id: prod._id!,
        //   name: prod.name!,
        //   img: prod.img!,
        //   description: prod.description!,
        //   price: prod.price!,
        // };
        return products;
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
