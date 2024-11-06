import React from "react";
import BankImage from "../assets/bank.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* left-side */}
      <div className="w-1/3">
        <img
          src={BankImage}
          alt="bank-img"
          className="object-cover w-full h-full"
        />
      </div>
      {/* right-side login-form */}
      <div className="w-2/3 flex items-center justify-center bg-white">
        <div className="w-full max-w-xl p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
