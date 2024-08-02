import { CustomButton } from "../components/CustomButton";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      enqueueSnackbar("Signin successful", { variant: "success" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="inline-grid grid-cols-2 gap-4 h-screen w-screen items-center">
      <div className="m-28">
        <img src="../src/images/Logo.png" alt="Logo" />
      </div>
      <div className="bg-gray-100 h-screen px-24 pt-40">
        <div className="text-3xl font-bold text-center">
          <h1>Welcome Back!</h1>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
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
        <div className="pt-8">
          <CustomButton label={"Login to your Account"} onClick={handleSignin} />
          <button
            type="button"
            className="w-full h-10 flex justify-center text-black bg-gray-100 border-2 border-black hover:border-4 hover:border-customGreen focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2"
            onClick={() => navigate("/signup")}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
