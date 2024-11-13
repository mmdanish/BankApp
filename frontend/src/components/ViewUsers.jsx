import React, { useEffect, useState } from "react";
import bankImage from "../assets/bank.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!users.length) return <div>Loading...</div>;

  return (
    <>
      <div className="flex h-screen">
        {/* Left Side - Background Image */}
        <div
          className="w-1/3 bg-cover bg-center"
          style={{ backgroundImage: `url(${bankImage})` }}
        ></div>

        {/* Right Side - User List */}
        <div className="w-3/4 bg-white p-8 flex flex-col">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 mb-4 w-full bg-[#B7DACF]"
          />

          {/* User Table */}
          <div className="overflow-y-auto h-[600px]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-t-2 border-b-2 border-black">
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">View More</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="transition-colors">
                    <td className="py-2 px-9 flex items-center">
                      <img
                        src={`http://localhost:4000/${user.image}`}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover mr-5"
                      />
                      {user.username}
                    </td>
                    <td className="py-7 px-4">
                      <Link
                        to={`/admin/viewprofile/${user.username}`}
                        className="bg-[#B7DACF] text-black px-4 rounded-md mr-2 hover:bg-[#87b4a6]"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/userhistory/${user.username}`}
                        className="bg-[#B7DACF] text-black px-4 rounded-md hover:bg-[#87b4a6]"
                      >
                        History
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUsers;
