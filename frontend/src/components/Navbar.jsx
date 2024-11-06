import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileImageUrl(`http://localhost:4000/${response.data.photo}`);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Show toast notification
    toast.success("Logout successful!");
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#87b4a6] font-bold">
      <ToastContainer />
      {/* Left Section - Profile Icon */}
      <div className="flex items-center">
        <Link to="/user/viewProfile">
        {profileImageUrl ? (
          <img
            src={profileImageUrl} 
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div> // Placeholder if no image
        )}
        </Link>
      </div>

      {/* Center Section - Home Link */}
      <div className="flex-grow flex justify-center">
        <Link to="/user/home" className="hover:underline text-lg">
          Home
        </Link>
      </div>

      {/* Right Section - Icons and Links */}
      <div className="flex items-center gap-6">
        <Link to="#">
          {/* Notification Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link to="/user/deposit" className="hover:underline">
          Deposit
        </Link>
        <Link to="/user/withdraw" className="hover:underline">
          Withdraw
        </Link>
        <button onClick={handleLogout} className="flex items-center">
          {/* Logout Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;