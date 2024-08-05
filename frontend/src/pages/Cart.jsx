import { useEffect, useState } from "react";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useSnackbar } from "notistack";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
} from "@mui/material";
import { CustomButton } from "../components/CustomButton";
import Footer from "../components/Footer";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/online-products/getitems-from-onlinecart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.CartProducts);
      } catch (error) {
        enqueueSnackbar("Failed to fetch products from cart", {
          variant: "error",
        });
      }
    };

    fetchProducts();
  }, [enqueueSnackbar, token]);

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


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/online-products/delete-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      enqueueSnackbar("Product removed from cart", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to remove product from cart", { variant: "error" });
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar  showCart={true} showWishlist={true} />
        <div className="m-4 font-semibold ">
  <span className="text-2xl text-gray-800">Cart : {products.length} item </span>
</div>
<div className="p-8">
      <Grid container spacing={4} className="ml-5 mr-5">
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card className="m-3 p-3 ">
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary" >
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
                  label={"Remove from Cart"}
                  onClick={() => handleDelete(product._id)} 
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
