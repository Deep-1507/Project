import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ConditionalNavbar from "../components/ConditionalNavbar";
import { Inputbox } from "../components/Inputbox";
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

export const BillingPage = () => {
  const [userData, setUserData] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [billingProducts, setBillingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [TotalBillvalue,setTotalBillValue] = useState(null);
  const [productsOffline, setProductsOffline] = useState([]);
  const [success, setSuccess] = useState('');
  const [token] = localStorage.getItem("token");
  const navigate = useNavigate();

  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar(); // To display error messages

    const today = new Date();
    const sessionDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const sessionTime = today.toTimeString().split(' ')[0]; // HH:MM:SS

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const userName = queryParams.get("name");
  const userUsername = queryParams.get("username");
  console.log(billingProducts);

  useEffect(() => {
    const calculateTotalAmount = () => {
        const total = billingProducts.reduce((acc, product) => acc + parseFloat(product.productPrice), 0);
        setTotalBillValue(total);
    };

    calculateTotalAmount();
}, [billingProducts]);




  const addToBilling = (product) => {
    setBillingProducts((prevBillingProducts) => {
      if (!prevBillingProducts.some((p) => p._id === product._id)) {
        return [...prevBillingProducts, product];
      }
      return prevBillingProducts;
    });
  };

  const removeFromBilling = (productId) => {
    setBillingProducts((prevBillingProducts) =>
      prevBillingProducts.filter((product) => product._id !== productId)
    );
  };

  useEffect(() => {
    const fetchProductsOffline = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/offline-products/get-offline-products",
          {
            params: query ? { productName: query } : {},
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductsOffline(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Error fetching products");
      }
      setLoading(false);
    };

    fetchProductsOffline();
  }, [query, token]); // Dependency array with query and token

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
}, [enqueueSnackbar, token, userId]);

const handleSubmit = async () => {
  try {
      // Prepare the data to be sent in the request
      const data = {
          sessionDate,
          sessionTime,
          storeId: storeData._id,
          storeHandlersName: `${storeData.firstName} ${storeData.lastName}`,
          userId: userData._id,
          customersName: `${userData.firstName} ${userData.lastName}`,
          Items: billingProducts, // Ensure this is an array of items
          billingAmount: TotalBillvalue,
      };

      // Make the API request
      const response = await axios.post(
          'http://localhost:3000/api/v1/stores/create-session',
          data,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );

      // Handle the successful response
      setSuccess('Session created successfully!');
      setError('');
      console.log(response.data); // Log the response data if needed
      enqueueSnackbar("Billing Done! Session Closed Successfully! Thank you for shopping with us 😊 ", { variant: "success" });
      navigate('/store-dashboard');
  } catch (err) {
      // Handle errors
      setError('Error creating session');
      setSuccess('');
      console.error(err);
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <ConditionalNavbar />
      </div>

      <div className="p-8 ">
        <div className="text-3xl text-center   font-semibold underline decoration-walmartYellow">
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
          <div className="w-2/3 pr-4">
            <h2 className="text-2xl text-center font-bold underline decoration-walmartBlue">
              Products Section
            </h2>
            <div>
              <Inputbox
                label={"Search Products"}
                placeholder={"Enter Product ID or Name"}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="p-4">
              {productsOffline.length > 0 ? (
                <ul>
                  {productsOffline.map((product) => (
                    <li key={product._id} className="border shadow-xl p-4 my-4">
                      <p>ID:{product._id}</p>
                      <p>Mode:{product.mode}</p>
                      <h3>{product.productName}</h3>
                      <p>{product.productDescription}</p>
                      <p>Price: {product.productPrice}</p>
                      <p>Quantity: {product.productQty}</p>
                      <span className="">
                        <CustomButton
                          label={"Add to Billing"}
                          onClick={() => addToBilling(product)}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
          <div className="bg-walmartYellow w-1"></div>

          <div className="w-2/3">
            <h2 className="text-2xl text-center font-bold underline decoration-walmartBlue">
              Billing Section
            </h2>
            <div className="p-4">
              {billingProducts.length > 0 ? (
                <ul>
                  {billingProducts.map((product) => (
                    <li key={product._id} className="border shadow-xl p-4 my-4">
                      <p>{product._id}</p>
                      <p>Mode:{product.mode}</p>
                      <h3>{product.productName}</h3>
                      <p>{product.productDescription}</p>
                      <p>Price: {product.productPrice}</p>
                      <p>Quantity: {product.productQty}</p>
                      <span className="">
                        <CustomButton
                          label={"Remove from Billing"}
                          onClick={() => removeFromBilling(product._id)}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products found</p>
              )}

              <div className="flex border-4 rounded-lg justify-between shadow-xl p-4">
                <div>Total Amount:</div>
                <div>{TotalBillvalue}</div>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-red-600 mt-8 hover:bg-red-800 focus:outline-none cursor-pointer focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
              >
                Start Billing and Close the Session
              </button>
            </div>
          </div>

          <div className="bg-walmartYellow w-1"></div>
          <div className="w-1/3">
            <h2 className="text-2xl font-bold text-center underline decoration-walmartBlue">
              Users Online Cart
            </h2>
            <div className="m-4 font-semibold text-center">
              <span className="text-2xl text-gray-800">
                Cart: {products.length} item{products.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="p-8">
              <div className="p-4">
                {products.length > 0 ? (
                  <ul>
                    {products.map((product) => (
                      <li
                        key={product._id}
                        className="border shadow-xl p-4 my-4"
                      >
                        <p>{product._id}</p>
                        <p>Mode:{product.mode}</p>
                        <h3>{product.productName}</h3>
                        <p>{product.productDescription}</p>
                        <p>Price: {product.productPrice}</p>
                        <p>Quantity: {product.productQty}</p>
                        <span className="">
                          <CustomButton
                            label={"Add to Billing"}
                            onClick={() => {
                              addToBilling(product);
                            }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
