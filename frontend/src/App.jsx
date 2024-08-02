import { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SnackbarProvider } from 'notistack';
// import { Products } from "./pages/Products";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/online-prodcuts" element={<Products />} /> */}
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
    </>
  )
}

export default App
