import React from 'react';
import { CustomButton } from './CustomButton'; // Adjust import path as necessary

const Cards = ({ products }) => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Cards;
