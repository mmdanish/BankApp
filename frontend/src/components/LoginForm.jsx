import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { fetchProfileData } = useProfile();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your backend login endpoint
      const response = await axios.post("/api/users/login", formData);

      // Save the token from the response to localStorage (or cookies)
      localStorage.setItem("token", response.data.token);
      fetchProfileData();

      // Show success toast
      toast.success("Login successful!");
      setTimeout(() => {
        if (response.data.user.role === "admin") {
          window.location.href = "/admin/home";
        } else {
          window.location.href = "/user/home";
        }
      }, 1000);
      // Redirect user to a dashboard or home page
    } catch (err) {
      // Show error notification
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="w-full max-w-md h-[500px] p-12 bg-[#87B4A6] rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 font-[Inknut Antiqua]">
          Login
        </h2>
        <form
          className="mb-4 mt-[48px] font-[Inknut Antiqua]"
          onSubmit={handleSubmit}
        >
          {/* Username Input */}
          <div className="relative mb-8">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#87B4A6] border-b-2 border-black py-3 px-4 focus:outline-none peer"
              required
            />
            <label
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out 
              text-lg ${formData.username && "text-sm top-[-20px] text-black"}`}
            >
              Username
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-8">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#87B4A6] border-b-2 border-black py-3 px-4 focus:outline-none peer"
              required
            />
            <label
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out 
              text-lg ${formData.password && "text-sm top-[-20px] text-black"}`}
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-[75px]">
            <button
              type="submit"
              className="w-1/3 h-12 bg-[#D9D9D9] rounded-[20px] flex items-center justify-center hover:bg-[#A8A8A8]"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-12">
            <p className="text-black">
              Don't have an account?{" "}
              <Link to="/register" className="ms-3 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
