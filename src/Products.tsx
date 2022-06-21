import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.scss";
import { ApiClient } from "./ApiClient";
//import { useQuery, gql } from "@apollo/client";

export type Product = {
  img: string;
  _id: number;
  name: string;
  price: number;
  description: string;
};

function Products() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const imgPath = "/assets/";

  // const GET_PRODS = gql`
  //   query GetQuestion {
  //     que
  //   }
  // `;

  useEffect(() => {
    (async () => {
      console.log("fetching prods");
      const data = await ApiClient.fetch("/products");
      const fetchedProducts = await data.json();
      setProducts(fetchedProducts);
    })();
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          _id={product._id}
          name={product.name}
          price={product.price}
          img={imgPath + product.img + ".jpg"}
          description={product.description}
        />
      ))}
    </div>
  );
}

export default Products;
