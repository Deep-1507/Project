import React from 'react';
import axios from 'axios'; // Add this import statement
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {



  const imageUrl = product.productImages && product.productImages.length > 0
    ? product.productImages[0]
    : '/'; // Placeholder image if no image data



    const handleTryOn = async () => {
      try {
        const response = await axios.post('http://localhost:8080/upload_product_image/', {
          imageUrl: imageUrl,
        },
      {
      withCredentials: true // This ensures cookies are sent with the request
    });
    
        console.log('Image uploaded successfully:', response.data);
        localStorage.setItem('source_image', response.data);
        // Redirect to the upload_source_image page in a new window
        const newWindow = window.open('http://localhost:8080/upload_profile_image/', '_blank');
        if (newWindow) {
          newWindow.focus(); 
        }
      } 
      catch (error) {
        console.error('Error uploading image:', error);
      }
    };


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
      <Button size="small" color="primary" onClick={handleTryOn}>
    Try On
    </Button>
    </Card>
  );
};

export default ProductCard;