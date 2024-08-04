import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleLogout = () => {
      
     
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    enqueueSnackbar("Logout successful", { variant: "success" });

    setTimeout(() => {
      navigate("/signin");
    }, 1000);

    
  };

  return (
    <div className="w-full">
      <div className="Navbar w-full bg-walmartBlue flex items-center justify-between px-6 shadow-md h-20 font-sans">
        {/* Left section with logo */}
        <div className="flex items-center">
          <Icon icon="tabler:brand-walmart" width="50" color="#FFC120" />
        </div>
        <div className="flex items-center w-1/2 relative">
  <input
    type="text"
    placeholder="Search..."
    className="w-full px-4 py-2 rounded-full bg-white text-[#0071CE] focus:outline-none"
  />
  <span className="absolute right-2.5 flex items-center justify-center w-8 h-8 bg-walmartBlue rounded-full">
    <Icon icon="ic:baseline-search" color="white"/>
  </span>
</div>


        {/* Right section with icons and logout button */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <Icon icon="mdi:heart" width="24" color="white" />
            <span className="text-white">Wishlist</span>
          </div>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => navigate("/online-cart")}
          >
            <Icon icon="tabler:shopping-cart" width="24" color="white" />
            <span className="text-white" >My Cart</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <Icon icon="material-symbols:person" width="24" color="white" />
            <span className="text-white">My Account</span>
          </div>
          <div className="bg-white px-4 py-2 text-walmartBlue flex items-center justify-center rounded-full font-semibold cursor-pointer shadow-lg hover:bg-gray-100 transition duration-300">
            <button onClick={handleLogout}>
            Log out
            </button>
            
          </div>
        </div>
      </div>
      <div className="bg-walmartBlue opacity-25 h-8"></div>
    </div>
  );
};

export default Navbar;
