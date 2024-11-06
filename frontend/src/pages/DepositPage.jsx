import React, { useState, useEffect } from "react";
import bankImage from "../assets/bank-bg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DepositPage = ({ onTransactionUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data: ", error);
        setMessage("Failed to fetch profile data");
      }
    };
    fetchProfileData();
  }, []);

  // Handle Deposit Confirmation
  const handleDeposit = async () => {
    if (depositAmount === "" || depositAmount <= 0) {
      toast.error("Please enter a valid deposit amount");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/api/transactions/deposit",
        {
          amount: depositAmount,
          details: "Credit",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the profile data with the new balance
      setProfileData((prev) => ({
        ...prev,
        balance: prev.balance + depositAmount, // Update Amount
      }));

      toast.success(response.data.message || "Deposit successfull!");
      setDepositAmount("");
      setIsModalOpen(false);
      onTransactionUpdate();

      setTimeout(() => {
        window.location.href = "/user/home";
      }, 3800);
    } catch (error) {
      console.error("Error on depositing: ", error);
      toast.error(error.response?.data?.message || "Deposit failed");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDepositAmount("");
    setMessage("");
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-start items-center"
      style={{ backgroundImage: `url(${bankImage})` }}
    >
      <div className="relative w-1/3 bg-[#B7DACF] rounded-3xl shadow-lg p-8 ml-12">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
        />
        <div className="flex flex-col items-center mb-5">
          <h2 className="font-bold">Deposit</h2>
        </div>
        {profileData ? (
          <div className="grid grid-cols-2 px-4 py-10">
            <div className="space-y-8">
              <h3 className="font-semibold">Account no:</h3>
              <p className="text-slate-500 ps-3">{profileData.accountNumber}</p>

              <h3 className="font-semibold">Branch</h3>
              <p className="text-slate-500 ps-3">Calicut</p>

              <h3 className="font-semibold">Available Balance</h3>
              <p className="text-slate-500 ps-3">{profileData.balance}</p>
            </div>
          </div>
        ) : (
          <p>Loading Account Infromation...</p>
        )}
        <button
          type="submit"
          onClick={openModal} // show the modal
          className="w-2/5 bg-[#D9D9D9] block mx-auto text-black py-3 rounded-2xl transition duration-300 hover:bg-[#608f82]"
        >
          Deposit
        </button>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}

        {/* Deposit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-4">Enter Deposit Amount</h3>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                placeholder="Amount"
                className="border border-gray-300 p-2 rounded mb-4 w-full"
              />
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeposit}
                  className="bg-[#608f82] text-white rounded px-4 py-2 hover:bg-[#335d51] transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositPage;
