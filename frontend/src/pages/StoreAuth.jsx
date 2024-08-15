import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Icon } from "@iconify/react";
import { CustomButton } from "../components/CustomButton";
import { Inputbox } from "../components/Inputbox";
import "./AuthContainer.css"; 

const StoreAuth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [uid, setuid] = useState("");
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
          location,
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

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/stores/signin",
        {
          uid,
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      enqueueSnackbar("Signin successful", { variant: "success" });

      setTimeout(() => {
        navigate("/store-dashboard");
      }, 1000);
    } catch (err) {
      setError("Failed to sign in.");
    }
  };

  function SwitchContent(){
    const content = document.getElementById('content');
    const registerBtn =  document.getElementById('register');
    const loginBtn =  document.getElementById('login');

    registerBtn.addEventListener('click', () =>{
      content.classList.add("active")
    });
    loginBtn.addEventListener('click', () =>{
      content.classList.remove("active")
    });
  }

  return (
    <div className='flex items-center justify-center h-screen bg-walmartBlue bg-opacity-15'>
    <div className="content justify-content-center shadow-lg flex body " id='content'>
        {/* Sign Up Form */}
        <div className="m-5 w-1/2 ">
        <form className=" ">
          <div className=" ">
            <div className='flex items-center justify-center '>
            <Icon icon="tabler:brand-walmart" width="70" color="#FFC120"  />
            </div>
            <h2 className=" text-xl font-semibold text-center"> Create a Store </h2>
          </div>
        
            {error && <div className="error-message">{error}</div>}
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
            <CustomButton label={"Create Account"} onClick={handleSignup} />
          </form>
        </div>

        {/* Sign In Form */}
        <div className=" m-5 w-1/2">
        <form className=" ">
          <div className=" ">
          <div className='flex items-center justify-center m-2'>
            <Icon icon="tabler:brand-walmart" width="70" color="#FFC120"  />
            </div>
            <h2 className=" text-xl font-semibold text-center">Store Sign in</h2>
           
          </div>
        
            {error && <div className="error-message">{error}</div>}
            <Inputbox
          label={"UID"}
          placeholder={"Enter your Unique ID prvided by Walmart"}
          onChange={(e) => setuid(e.target.value)}
        />
        <Inputbox
          label={"Username"}
          placeholder={"name@gmail.com"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Inputbox
          label={"Password"}
          placeholder={"123456"}
          onChange={(e) => setPassword(e.target.value)}
        />

            <CustomButton label={"Login"} onClick={handleSignin} />
          </form>
        </div>


<div className='switch-content'>
  <div class="shape-overlay"></div>
  <div className='switch'>
    <div className='switch-panel switch-left'>
      <h1 className='flex justify-center text-2xl font-bold'>Hello, Again!</h1>
      <p className='flex justify-center m-3'>Enter your details and start your journey with us.</p>
      <button className='btn text-white w-50 fs-6 border-white border-2' id='login' onClick={SwitchContent}>Login</button>
    </div>

    <div className='switch-panel switch-right'>
      <h1 className='flex justify-center text-2xl font-bold'>Welcome!</h1>
      <p className='flex justify-center m-3'>To keep connected with us, please login with your personal info.</p>
      <button className='btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>Register</button>
    </div>
  </div>
</div>


    </div>
    </div>
  );
};

export default StoreAuth;
