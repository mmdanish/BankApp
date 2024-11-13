import React, { useEffect, useState } from "react";
import bankImage from "../assets/bank-bg.png";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  if (!profileData) return <div>Loading...</div>;
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex justify-start items-center"
        style={{ backgroundImage: `url(${bankImage})` }}
      >
        <div className="relative w-[36rem] h-[36rem] bg-[#B7DACF] rounded-3xl shadow-lg p-8 ml-10 mb-10">
          <div className="flex flex-col items-center mb-5">
            <img
              src={`http://localhost:4000/${profileData.photo}`}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-3"
            />
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-16 px-4 py-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Email:</h3>
              <p>{profileData.email}</p>

              <h3 className="font-semibold">Address:</h3>
              <p>{profileData.address}</p>

              <h3 className="font-semibold">Age:</h3>
              <p>{profileData.age}</p>

              <h3 className="font-semibold">Aadhar:</h3>
              <p>{profileData.aadhar}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Username:</h3>
              <p>{profileData.username}</p>

              <h3 className="font-semibold">Date of Birth:</h3>
              <p>{new Date(profileData.dob).toISOString().split("T")[0]}</p>

              <h3 className="font-semibold">Phone Number:</h3>
              <p>{profileData.phone}</p>

              <h3 className="font-semibold">PAN No:</h3>
              <p>{profileData.pan}</p>
            </div>
          </div>

          <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-lg">
            <Link to="/user/editprofile">✎</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
