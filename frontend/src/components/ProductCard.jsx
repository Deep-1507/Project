import React from 'react';
import axios from 'axios'; // Add this import statement
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {



  const imageUrl = product.productImages && product.productImages.length > 0
    ? product.productImages[0]
    : '/'; // Placeholder image if no image data

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
      <Button size="small" color="primary" onClick={() => { 
    const newWindow = window.open('http://localhost:8080/upload_source_image/', '_blank');
    if (newWindow) {
      newWindow.focus(); // Ensures the new tab is focused
    }
    }}>
    Try On
    </Button>
    </Card>
  );
};

export default ProductCard;