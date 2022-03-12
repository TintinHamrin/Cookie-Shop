import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './Products.scss';

type Product = {
  id: number;
  url: string;
};

function Products() {
  // const products: any[] = [];
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    fetch('/get', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((e) => console.log(e));
    console.log(products);
  }, []);

  return (
    <div className="products">
      <h1>Products</h1>
      {products.map((product) => (
        // <p key={Math.random()}>
        //   itemId: {product.id}, itemUrl: {product.url}
        // </p
        <ProductCard />
      ))}
    </div>
  );
}

export default Products;
