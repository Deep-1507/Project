import React from 'react';

const ProductCard = ({ product, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[350px] w-[300px]">
      <div className="relative p-4">
        <span className="absolute top-4 left-4 text-xs text-gray-500 bg-white p-1 rounded">{product.mode}</span>
        <h2 className="text-2xl font-bold text-center mt-16 flex justify-start">{product.productName}</h2>
        <div>{`Qty: ${product.productQty}`}</div>
        <div className="bg-gray-100 p-2 rounded mt-2 shadow-sm">
          <p className="text-sm text-gray-600">{product.productDescription}</p>
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">{`Price: ${product.productPrice}`}</span>
        {children}
      </div>
    </div>
  );
};

export default ProductCard;
