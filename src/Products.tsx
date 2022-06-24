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
      {products && (
        <ProductCard
          _id={products!._id}
          name={products!.name}
          price={products!.price}
          img={imgPath + products!.img + ".jpg"}
          description={products!.description}
        />
      )}
    </div>
  );
}

export default Products;
