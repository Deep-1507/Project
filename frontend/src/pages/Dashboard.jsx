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
  Button,
} from "@mui/material";
import { CustomButton } from "../components/CustomButton";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <Container>
         <Inputbox
          label={"Search Box"}
          placeholder={"Enter the name of the product you wish to search"}
        //   onChange={(e) => {
        //     setUsername(e.target.value);
        //   }}
        />
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
              <CustomButton label={"Add to Cart"} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
