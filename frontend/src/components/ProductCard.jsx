import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const imageUrl = product.productImages && product.productImages.length > 0
    ? product.productImages[0]
    : '/path/to/placeholder/image.jpg'; // Placeholder image if no image data

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productDescription}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Rs.{product.productPrice}
        </Typography>
      </CardContent>
      <Button size="small" color="primary" onClick={() => onAddToCart(product)}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
