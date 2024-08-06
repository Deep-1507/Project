import { useEffect, useState } from "react";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Add this import
import Navbar from "../components/Navbar";
import "./Signin.css";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  Button,
} from "@mui/material";
import { CustomButton } from "../components/CustomButton";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/online-products/get-online-products"
        );
        setProducts(response.data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch products", { variant: "error" });
      }
    };

    fetchProducts();
  }, [enqueueSnackbar]);

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
          mode:product.mode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Product added to cart", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to add product to cart", { variant: "error" });
    }
  };

  return (
    <div className="scrollbar ">
      <div className="mb-3 ">
      <Navbar  showCart={true} showWishlist={true} showAccount={true} showDashboard={true} showStoreDashboard={false} />
      </div>
      <div className="p-8">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}>
               <CustomButton
                label="Add to Cart"
                onClick={() => handleAddToCart(product)}
                className="ml-auto"
              />
              </ProductCard>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
