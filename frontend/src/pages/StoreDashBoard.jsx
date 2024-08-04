import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Inputbox } from "../components/Inputbox";
import { CustomButton } from "../components/CustomButton";

export const StoreDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar(); // To display error messages

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/api/v1/stores/get-users-details", {
          params: { filter },
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.user);
      } catch (error) {
        setError(error.message);
        enqueueSnackbar("Failed to fetch users", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter, token, enqueueSnackbar]);

  return (
    <div>
      <div className="mb-3">
        <Navbar />
      </div>
      <div className="p-8">
        <Inputbox
          label={"Enter Customer's username"}
          placeholder={"name@gmail.com"}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className=" p-8">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          !loading && <div>No users found</div>
        )}
      </div>
    </div>
  );
};

// User component defined here
const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border-4 p-4 hover:border-customGreen">
      <div className="flex">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-walmartYellow flex items-center justify-center">
            {user.firstName[0]}
          </div>
        </div>

        <div className="ps-8">
          <div>Id: {user._id}</div>
          <div>
            Name: {user.firstName} {user.lastName}
          </div>
          {/* Assuming 'position' and 'positionseniorityindex' are available on user */}
          
        </div>
      </div>
      <div className="flex items-center">
      <CustomButton
  label={"Start Session"}
  onClick={() => {
    const name = encodeURIComponent(user.firstName + " " + user.lastName);
    navigate(`/store-billing-page?id=${user._id}&name=${name}&username=${user.username}`);
  }}
/>

      </div>
    </div>
  );
};
