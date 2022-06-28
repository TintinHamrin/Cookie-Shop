import { schema, types } from "papr";
import papr from "./db-config";

export const CartProduct = papr.model(
  "CartsProducts",
  schema({
    productId: types.number({ required: true }),
    price: types.number({ required: true }),
    cartId: types.string({ required: true }),
    tasty: types.boolean(),
  })
);

export const Product = papr.model(
  "Products",
  schema({
    _id: types.number({ required: true }),
    name: types.string({ required: true }),
    img: types.string({ required: true }),
    description: types.string({ required: true }),
    price: types.number({ required: true }),
  })
);
export const User = papr.model(
  "Users",
  schema({
    username: types.string({ required: true }),
    password: types.string(),
    salt: types.string({ required: true }),
    hash: types.string({ required: true }),
  })
);

export const PastrySuggestion = papr.model(
  "pastries",
  schema({
    pastry: types.string({ required: true }),
  })
);
