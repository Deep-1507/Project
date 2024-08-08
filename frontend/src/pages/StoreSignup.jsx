import { CustomButton } from "../components/CustomButton";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import {Icon} from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
import "./Signin.css"; 

export const StoreSignup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/stores/signup",
        {
          username,
          firstName,
          lastName,
          password,
          location
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      enqueueSnackbar("Signup successful", { variant: "success" });

      setTimeout(() => {
        navigate("/store-dashboard");
      }, 1000);
    } catch (err) {
      setError("Failed to sign up.");
    }
  };

  return (
    <div className=" signin-container w-full h-full flex flex-col items-center overflow-auto ">
   
       <div className="logo p-5 w-full flex justify-center">
            <Icon icon="tabler:brand-walmart" width="70" color="#FFC120" />
            </div>
      <div className=" ">
        {/* <img src=" " alt=" " srcset="" /> */}
      </div>

      <div className=" h-full px-24 pt-18 items-center">
        <div className="text-xl font-semibold text-center">
        <span className="text-red-600">Warning!</span> <br />
        <span className="text-red-600">This page should only to be accessed by Store Handler InCharge</span><br />
          <p> Create a Store </p>

         
        </div>
        <Inputbox
          label={"Username"}
          placeholder={"name@gmail.com"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
         <Inputbox
          label={"Location"}
          placeholder={"Enter the Location of Store"}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <div className="w-full flex justify-between items-center space-x-8">
        <Inputbox
          label={"First Name"}
          placeholder={"First name"}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <Inputbox
          label={"Last Name"}
          placeholder={"Last name"}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        /> </div>
       
        <Inputbox
          label={"Password"}
          placeholder={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="pt-8">
          <CustomButton label={"Create Store"} onClick={handleSignup} />
        </div>

        <button
          type="button"
          className="border border-gray-500 backdrop-blur-xl text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold"
          onClick={() => navigate("/signin")}
        >
          LOG IN INSTEAD
        </button>
      </div>
     
<div className="background-svg absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
        <svg viewBox="0 0 1440 320" fill="#FFC120">
          <path
            d="M0,160L480,80L960,0L1440,160L1440,320L960,240L480,320L0,240Z"
            transform="rotate(180 720 160) translate(0, -160)"
          />
        </svg>
      </div>
    </div>
  );
};
