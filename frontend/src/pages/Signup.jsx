import { CustomButton } from "../components/CustomButton";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
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
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError("Failed to sign up.");
    }
  };

  return (
    <div className="inline-grid grid-cols-2 gap-4 h-screen w-screen items-center">
      <div className="m-28">
        <img src="../src/images/Logo.png" alt="Logo" srcset="" />
      </div>

      <div className="bg-gray-100 h-screen px-24 pt-28">
        <div className="text-3xl font-bold text-center">
          <h1>Create New Account?</h1>
        </div>
        <Inputbox
          label={"Username"}
          placeholder={"name@gmail.com"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Inputbox
          label={"First Name"}
          placeholder={"Deependra"}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <Inputbox
          label={"Last Name"}
          placeholder={"Kumar"}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <Inputbox
          label={"Password"}
          placeholder={"123456"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="pt-8">
          <CustomButton label={"Create Account"} onClick={handleSignup} />
        </div>

        <button
          type="button"
          className="w-full h-10 flex justify-center  text-black bg-gray-100 border-2 border-black hover:border-4 hover:border-customGreen focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
          onClick={() => navigate("/signin")}
        >
          Alrady a user
        </button>
      </div>
    </div>
  );
};
