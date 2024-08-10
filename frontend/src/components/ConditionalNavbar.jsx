import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const location = useLocation();

  const isStoreDashboard = location.pathname.includes('/store-dashboard');

  return (
    <Navbar showCart={!isStoreDashboard} showWishlist={!isStoreDashboard} />
  );
};

export default ConditionalNavbar;
