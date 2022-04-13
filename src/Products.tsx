import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.scss";
import {ApiClient} from "./ApiClient";

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

  useEffect(() => {
    (async () => {
      const data = await ApiClient.fetch("/products");
      const fetchedProducts = await data.json();
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
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
