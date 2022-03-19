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
  const imgPath = '/assets/';

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
      {products.map((product) => (
        <ProductCard name={product.name} img={imgPath + product.img + '.jpg'} />
      ))}
    </div>
  );
}

export default Products;
