import React, { useState, useEffect } from "react";
import bankImage from "../assets/bank-bg.png";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactionData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transaction history", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bankImage})` }}
    >
      {/* Container for content with fixed width */}
      <div className="relative w-[800px] bg-[#B7DACF] rounded-3xl shadow-lg p-8 mx-auto overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

        {/* Transaction table with horizontal scrolling if necessary */}
        <div className="h-[400px] overflow-x-auto">
          <table className="w-full text-left table-auto">
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
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4">{transaction.details}</td>
                  <td
                    className={`py-2 px-4 ${
                      transaction.details === "Credit"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
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
  );
};

export default TransactionHistory;