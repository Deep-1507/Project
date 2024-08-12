import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ConditionalNavbar from "../components/ConditionalNavbar";
import Footer from "../components/Footer";
import { Inputbox } from "../components/Inputbox";
import { CustomButton } from "../components/CustomButton";
import { Search } from "../components/Search";
import Navbar from "../components/Navbar";
import gifLogo from '../assets/A.gif';

export const AddProductoffline = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ productId, setProductId] = useState("");
  const [ productName, setProductName] = useState("");
  const [ productQty, setProductQty] = useState();
  const [ productPrice, setProductPrice] = useState("");
  const [ productDescription , setProductDes] = useState("");
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar(); 


    const addProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/offline-products/create-product",
          {
            productId,
            productQty,
            productPrice,
            productName,
            productDescription
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // You can handle success here if needed
        enqueueSnackbar("Product added successfully", { variant: "success" });

      } catch (error) {
        setError(error.message);
        enqueueSnackbar("Failed to add product", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-5">
      <Navbar showStoreDashboard ={true} showPdt={true} showLogout={true}/>
      </div>     
      <div className="bg-slate-100 shadow-2xl m-10 rounded-2xl flex">
  {/* Left side: Form */}
  <div className="w-2/3 p-10">
    <div className="text-left font-bold ml-2">
      <div className="text-4xl m-3 mt-10">Add your Products...</div>
    </div>
    <form className="flex flex-col justify-center">
      <Inputbox label="Enter Product Id" type="text" name="productId" placeholder="Enter Product Id" onChange={(e) => setProductId(e.target.value)} />
      <Inputbox
  label="Enter Product Quantity"
  type="number"
  name="productQty"
  placeholder="Enter Product Quantity"
  onChange={(e) => setProductQty(Number(e.target.value))}
/>

      <Inputbox label="Enter Product Price" type="text" name="productPrice" placeholder="Enter Product Price" onChange={(e) => setProductPrice(e.target.value)} />
      <Inputbox label="Enter Product Name" type="text" name="productName" placeholder="Enter Product Name" onChange={(e) => setProductName(e.target.value)} />
      <Inputbox label="Enter Product Description" type="text" name="productDes" placeholder="Enter Product Description" onChange={(e) => setProductDes(e.target.value)} />

      <div className="flex justify-center items-center mt-6">
        <div className="w-full">
          <CustomButton label="Submit" onClick={addProducts} />
        </div>
      </div>
    </form>
  </div>

  {/* Right side: GIF */}
  <div className="w-1/3 flex justify-center items-center p-6 ">
    <img src={gifLogo} alt="logo" width={120} />
  </div>
</div>

      <Footer />
    </div>
  );
};


