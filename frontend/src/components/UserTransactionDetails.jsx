import React, { useEffect, useState } from "react";
import bankImage from "../assets/bank.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserTransactionDetails = () => {
  const { username } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", image: " " });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/admin/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/transactions/history/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction history", error);
      }
    };
    fetchTransactionData();
  }, [username]);
  return (
    <>
      <div className="flex h-screen">
        {/* Left Side - Background Image */}
        <div
          className="w-1/3 bg-cover bg-center"
          style={{ backgroundImage: `url(${bankImage})` }}
        ></div>

        {/* Right Side - Profile and Transaction Details */}
        <div className="w-3/4 bg-[#B7DACF] p-8 flex flex-col">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={`http://localhost:4000/${userDetails.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h2 className="text-lg font-bold">{userDetails.name}</h2>
          </div>

          {/* Transaction Details Section */}
          <div className="flex-grow overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-t-2 border-b-2 border-black">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="py-2 px-4">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-4">{transaction.details}</td>
                    <td className={`py-2 px-4 ${
                      transaction.details === 'Credit' ? "text-green-700" : "text-red-700"
                    }`}>
                      {transaction.details === "Credit"
                        ? `+ ₹ ${transaction.amount}`
                        : `- ₹ ${transaction.amount}`}
                    </td>
                    <td className="py-2 px-4">₹ {transaction.balance}</td>
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

export default UserTransactionDetails;
