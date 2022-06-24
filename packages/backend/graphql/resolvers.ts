import { Product } from "../database/db-models";

const resolvers = {
  // async products() {
  //   const products = await Product.find({});
  //   console.log("prods", products);
  //   return products;
  // },
  products: async () => {
    const products = await Product.find({});
    return products;
  },
  hello: () => {
    return 1;
  },
};

export default resolvers;
