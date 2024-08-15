import React from 'react';
import { CardMedia } from '@mui/material';

const ProductInfo = ({ product, onAddToCart }) => {
  const imageUrl = product.productImages && product.productImages.length > 0
    ? product.productImages[0]
    : '/'; // Placeholder image if no image data

  return (
    <>
      <div className="flex p-4 max-w-2xl gap-52 items-center justify-between m-4">
        <CardMedia
          component="img"
          height="200" // Adjust height as needed
          image={imageUrl}
          alt={product.productName}
        />
        <div className="flex border border-gray-300 p-5 max-w-xl mx-auto">
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-2">{product.productName}</h1>
            <p className="text-sm">{product.productDescription}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-2 text-gray-600">293 ratings</span>
              <span className="ml-4 text-gray-600">2K+ bought in past month</span>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl text-red-600 font-bold mr-2">Rs.{product.productPrice}</span>
            </div>
            <div className="text-green-600 mb-2">In stock</div>
            <div className="mb-2">Free delivery Tuesday, 20 August</div>
            <div className="flex mb-2">
              <button
                className="bg-yellow-400 text-black px-4 py-2 mr-2 border border-yellow-600"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 border border-orange-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProductInfo;
