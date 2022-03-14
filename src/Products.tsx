import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './Products.scss';

export type Product = {
  //make a class for product?
  // id: number;
  img: string;
  name: string;
};

function Products() {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/products');
      const fetchedProducts = await data.json();
      setProducts(fetchedProducts);
      console.log(fetchedProducts);
    })();
  }, []);

  return (
    <div className="products">
      <h1>Products</h1>
      <p>{products.length}</p>
      {products.map((product) => (
        <ProductCard name={product.name} img={product.img} />
      ))}
    </div>
  );
}

export default Products;
