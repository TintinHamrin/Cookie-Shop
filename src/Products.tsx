import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './Products.scss';

type Product = {
  //make a class for product?
  id: number;
  url: string;
};

function Products() {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/products');
      const json = await data.json();
      setProducts(json);
      console.log(json);
      console.log(json.length);
    })();
  }, []);

  return (
    <div className="products">
      <h1>Products</h1>
      <p>{products.length}</p>
      {/* {products.map((product) => (
        // <p key={Math.random()}>
        //   itemId: {product.id}, itemUrl: {product.url}
        // </p
        <ProductCard />
      ))} */}
    </div>
  );
}

export default Products;
