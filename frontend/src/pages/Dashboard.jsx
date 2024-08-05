import { useEffect, useState } from "react";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Add this import
import Navbar from "../components/Navbar";
import "./Signin.css";
import Footer from "../components/Footer";
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
      <Navbar  showCart={true} showWishlist={true} />
      </div>
      <div className="p-8">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.productDescription}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: {product.productPrice}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Quantity: {product.productQty}
                </Typography>
              </CardContent>
              <CardActions>
                <CustomButton
                  label={"Add to Cart"}
                  onClick={() => handleAddToCart(product)}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </div>
      <Footer/>
    </div>
  );
};
