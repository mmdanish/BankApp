import React, { useEffect, useState } from "react";
import bankImage from "../assets/bank-bg.png";
import { useProfile } from "../contexts/ProfileContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { profileData, loading } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    adhar: "",
    address: "",
    phone: "",
    age: "",
    pancard: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Profile data:", profileData);
    if (profileData) {
      const formattedDob = profileData.dob
        ? new Date(profileData.dob).toISOString().split("T")[0]
        : "";
      // Populate form data with profile data
      setFormData({
        name: profileData.name || "",
        username: profileData.username || "",
        email: profileData.email || "",
        dob: formattedDob || "",
        adhar: profileData.aadhar || "",
        address: profileData.address || "",
        phone: profileData.phone || "",
        age: profileData.age || "",
        pancard: profileData.pan || "",
        image: profileData.image || null,
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataObj = new FormData();

    // Append all form data to formDataObj
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      // Send a PUT request to update the user profile
      await axios.put("/api/users/update", formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/user/viewProfile"), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div
      className="bg-cover bg-center h-screen flex justify-start items-center"
      style={{ backgroundImage: `url(${bankImage})` }}
    >
      <div className="relative w-11/12 md:w-3/4 lg:w-1/2 bg-[#B7DACF] rounded-3xl shadow-lg p-10 ml-10">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold">Edit Profile</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Name</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Username</h3>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Date of Birth</h3>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Aadhar</h3>
              <input
                type="text"
                name="adhar"
                value={formData.adhar}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your Aadhar number"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Address</h3>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Phone Number</h3>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">Age</h3>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-1">PAN No</h3>
              <input
                type="text"
                name="pancard"
                value={formData.pancard}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your PAN number"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Upload Image</h3>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Image"
              />
            </div>
          </div>
        </form>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-2/5 bg-[#D9D9D9] block mx-auto mt-11 text-black py-3 rounded-2xl transition duration-300 hover:bg-[#799c91]"
        >
          Update
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default EditProfile;
