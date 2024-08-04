import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

export const BillingPage = () => {
  const [userData, setUserData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar(); // To display error messages

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const userName = queryParams.get("name");
  const userUsername = queryParams.get("username");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/details`,
          {
            params: { id: userId }, // Pass userId as a query parameter
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data.user); // Access user data correctly
      } catch (error) {
        setError(error.message);
        enqueueSnackbar("Failed to fetch user data", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, enqueueSnackbar]);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/stores/details`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStoreData(response.data.store);
      } catch (error) {
        setError(error.message);
        enqueueSnackbar("Failed to fetch store data", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/online-products/getitems-from-onlinecart-for-billing",
          {
            params: { id: userId },
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

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <div className="text-3xl text-center font-semibold underline decoration-walmartYellow">
          Billing Page
        </div>

        <div className="p-4 flex justify-between">
          <div className="mt-4">
            <h2 className="text-2xl underline decoration-walmartBlue">
              Store Data
            </h2>
            {loading && <div>Loading store data...</div>}
            {error && <div>Error: {error}</div>}
            {storeData ? (
              <div>
                <div>Id: {storeData._id}</div>
                <div>
                  Name: {storeData.firstName} {storeData.lastName}
                </div>
                <div>Username: {storeData.username}</div>
                <div>Location: {storeData.location}</div>
              </div>
            ) : (
              !loading && <div>No store data available</div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-2xl  underline decoration-walmartBlue">
              User Data
            </h2>
            {loading && <div>Loading user data...</div>}
            {error && <div>Error: {error}</div>}
            {userData ? (
              <div>
                <div>Id: {userData._id}</div>
                <div>
                  Name: {userData.firstName} {userData.lastName}
                </div>
                <div>Username: {userUsername}</div>
                {/* Display additional user data here if available */}
              </div>
            ) : (
              !loading && <div>No user data available</div>
            )}
          </div>
        </div>

        <hr />

        <div className="flex mt-4">
  <div className="w-2/3">
    <h2 className="text-2xl font-bold">Billing Section</h2>
    {/* Add your billing section content here */}
  </div>
  <div className="bg-walmartYellow w-1">
   
  </div>
  <div className="w-1/3">
    <h2 className="text-2xl font-bold text-center">Users Online Cart</h2>
    <div className="m-4 font-semibold text-center">
      <span className="text-2xl text-gray-800">
        Cart: {products.length} item{products.length !== 1 ? "s" : ""}
      </span>
    </div>
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold">{product.productName}</h3>
            <p className="text-gray-600">{product.productDescription}</p>
            <p className="text-lg font-medium text-gray-800">
              Price: {product.productPrice}
            </p>
            <p className="text-lg font-medium text-gray-800">
              Quantity: {product.productQty}
            </p>
            <div className="mt-4">
              <CustomButton
                label={"Add to Billing"}
                // onClick={() => handleDelete(product._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};
