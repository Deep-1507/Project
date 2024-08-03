import { useEffect, useState } from "react";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
} from "@mui/material";
import { CustomButton } from "../components/CustomButton";

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
    <Container>
        <div className="pt-10">
        <CustomButton
        label={`Cart: ${products.length}`}
        onClick={() => handleAddToCart(product)}
      />
        </div>
      
      <div  className="pb-10">
      <Inputbox
        label={"Search Box"}
        placeholder={"Enter the name of the product you wish to search"}
       
      />
      </div>
      
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
                  label={"Remove from Cart"}
                  onClick={() => handleDelete(product._id)} 
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
