import React from "react";
import ProductCard from "./ProductCard";
import "./Products.scss";
import { useQuery, gql } from "@apollo/client";

export type Product = {
  img: string;
  _id: number;
  name: string;
  price: number;
  description: string;
};

function Products() {
  const imgPath = "/assets/";

  const GET_PRODUCTS = gql`
    query products {
      products {
        _id
        name
        img
        description
        price
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Error..."</div>;
  const products = data.products;

  return (
    <div className="products">
      {products &&
        products.map((product: any) => (
          <ProductCard
            _id={product!._id}
            name={product!.name}
            price={product!.price}
            img={imgPath + product!.img + ".jpg"}
            description={product!.description}
          />
        ))}
    </div>
  );
}

export default Products;
