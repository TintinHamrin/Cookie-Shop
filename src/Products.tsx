import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.scss";

export type Product = {
  //make a class for product?
  // id: number;
  img: string;
  //   productId: number;
  productId: number;
  name: string;
  price: number;
  description: string;
};

function Products(props: any) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const imgPath = "/assets/";

  useEffect(() => {
    (async () => {
      const data = await fetch("/products");
      const fetchedProducts = await data.json();
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    })();
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          // productId={product._id}
          productId={product.productId}
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
