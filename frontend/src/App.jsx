import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { StoreSignin } from "./pages/StoreSignin";
import { StoreSignup } from "./pages/StoreSignup";
import { StoreDashBoard } from "./pages/StoreDashBoard";
import {BillingPage} from './pages/BillingPage';
import { Account } from './pages/Account';
import { Cart } from "./pages/Cart";
import { SnackbarProvider } from 'notistack';
// import { Products } from "./pages/Products";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/online-cart" element={<Cart />} />
          <Route path="/store-signin" element={<StoreSignin  />} />
          <Route path="/store-signup" element={<StoreSignup />} />
          <Route path="/store-dashboard" element={< StoreDashBoard />} />
          <Route path="/store-billing-page" element={<BillingPage />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path="/online-products" element={<Products />} /> */}
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
