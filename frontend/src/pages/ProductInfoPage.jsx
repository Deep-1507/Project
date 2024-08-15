import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";

const ProductInfoPage = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/online-products/get-online-product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch product", { variant: "error" });
      }
    };

    fetchProduct();
  }, [productId, enqueueSnackbar]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/online-products/add-to-cart-online",
        {
          productId: product._id,
          productQty: 1,
          productPrice: product.productPrice,
          productName: product.productName,
          productDescription: product.productDescription,
          mode: product.mode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Product added to cart", { variant: "success" });
    } catch (error) {
      console.error("Add to cart error:", error.response ? error.response.data : error.message);
      enqueueSnackbar("Failed to add product to cart", { variant: "error" });
    }
  };
  
  if (!product) return <div>Loading...</div>;

  return (
    <>
    <Navbar
     showCart={true}
     showWishlist={true}
     showAccount={true}
     showDashboard={true}
     showStoreDashboard={false}
     showLogout={true}
     showLogin={false}
    />
    <div>
      <ProductInfo product={product} onAddToCart={() => handleAddToCart(product)} />
    </div>
    <Footer/>
    </>
  );
};

export default ProductInfoPage;
