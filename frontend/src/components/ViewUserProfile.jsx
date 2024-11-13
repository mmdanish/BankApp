import React, { useEffect, useState } from "react";
import bankImage from "../assets/bank.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewUserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/admin/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching userd details:", error)
        if (error.response && error.response.status === 404) {
          setUserData(null); // User not found
        } else {
          alert("An error occurred while fetching user details. Please try again.");
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUserDetails();
  }, [username]);

  if (loading) return <div>Loading...</div>
  if (!userData) return <div>User not found</div>
  

  if (!userData) return <div>Loading...</div>;
  return (
    <>
      <div className="h-screen flex">
        {/* Background Image covering 1/3 of the screen */}
        <div
          className="w-1/3 bg-cover bg-center"
          style={{ backgroundImage: `url(${bankImage})` }}
        ></div>

        {/* User Information Container covering 2/3 of the screen */}
        <div className="relative w-1/2 bg-[#B7DACF] rounded-3xl shadow-lg p-8 ml-10 flex flex-col justify-start items-center h-[500px] mx-auto mt-20 me-10">
          <div className="flex flex-col items-center mb-5">
            <img
              src={`http://localhost:4000/${userData.image}`} // Use the correct variable here
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h2 className="text-2xl font-bold">{userData.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-16 px-4 py-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Email:</h3>
              <p>{userData.email}</p>

              <h3 className="font-semibold">Address:</h3>
              <p>{userData.address}</p>

              <h3 className="font-semibold">Age:</h3>
              <p>{userData.age}</p>

              <h3 className="font-semibold">Aadhar:</h3>
              <p>{userData.adhar}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Username:</h3>
              <p>{userData.username}</p>

              <h3 className="font-semibold">Date of Birth:</h3>
              <p>{new Date(userData.dob).toISOString().split("T")[0]}</p>

              <h3 className="font-semibold">Phone Number:</h3>
              <p>{userData.phone}</p>

              <h3 className="font-semibold">PAN No:</h3>
              <p>{userData.pancard}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserProfile;
