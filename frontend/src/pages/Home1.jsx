import React from "react";
import bankImage from "../assets/bank-bg.png";
import { useProfile } from "../contexts/ProfileContext";

const Home1 = () => {
  const { profileData } = useProfile();

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-start items-center"
      style={{ backgroundImage: `url(${bankImage})` }}
    >
      <div className="relative w-1/3 bg-[#B7DACF] rounded-3xl shadow-lg p-8 ml-12">
        <div className="flex flex-col items-center mb-5">
          <h2 className="mb-3 font-semibold">Available Balance</h2>
          <h2 className="text-2xl font-bold">
          {profileData?.balance ? `₹ ${profileData.balance}` : "$0"}
          </h2>
        </div>
        {/* Bank details */}
        <div className="grid grid-cols-2 px-4 py-10">
          <div className="space-y-8">
            <h3 className="font-semibold">Bank Name</h3>
            <p className="text-slate-500 ps-3">Horizon Bank</p>
            <h3 className="font-semibold">Branch</h3>
            <p className="text-slate-500 ps-3">Calicut</p>
            <h3 className="font-semibold">IFSC CODE</h3>
            <p className="text-slate-500 ps-3">HRZN0000269</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;