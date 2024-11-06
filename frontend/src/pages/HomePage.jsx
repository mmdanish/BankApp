import React from "react";
import { Link } from "react-router-dom";
import bankImage from "../assets/bank-bg.png";

import { useProfile } from "../contexts/ProfileContext";

const HomePage = () => {
  const { profileData, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profileData) return <div>No profile data available.</div>;

  return (
    <>
      <div
        className="bg-cover bg-center h-screen  justify-start items-center"
        style={{ backgroundImage: `url(${bankImage})` }}
      >
        <div className="flex text-white text-4xl pt-[50px] pb-[60px] font-semibold ms-[100px] gap-[150px]">
          <h1>Horizon Bank</h1>
          <h1>Horizon Bank</h1>
          <h1>Horizon Bank</h1>
        </div>
        <div className="relative w-1/2 bg-[#B7DACF] rounded-3xl shadow-lg p-8 ml-12 mb-[60px]">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-2xl font-bold mb-6 ">Account Number</h1>
            <h2 className="text-xl text-slate-500 font-semibold">
              {profileData.accountNumber}
            </h2>
          </div>
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-2xl font-semibold mb-6">Available Balance</h1>
            <h2 className="text-xl text-slate-500 font-semibold">
              ₹ {profileData.balance}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 py-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">
                <Link to="/user/history">View History</Link>
              </h3>
            </div>

            <div className="space-y-2 text-right pe-7">
              <h2 className="font-semibold">
                <Link to="/user/more">More</Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
