import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Home1 from "./pages/Home1";
import Layout from "./components/Layout";
import WithdrawPage from "./pages/WithdrawPage";
import DepositPage from "./pages/DepositPage";
import AdminLayout from "./components/AdminLayout";
import ViewProfile from "./components/ViewProfile";
import TransactionHistory from "./components/TransactionHistory";
import UserTransactionDetails from "./components/UserTransactionDetails";
import ViewUsers from "./components/ViewUsers";
import ViewUserProfile from "./components/ViewUserProfile";
import EditProfile from "./components/EditProfile";
import { ProfileProvider } from "./contexts/ProfileContext";
import NotFoundPage from "./pages/NotFoundPage";
import AdminHome from "./pages/AdminHome";


function App() {
  const [updateTransactions, setUpdateTransactions] = useState(false);
  const handleTransactionUpdate = () => {
    setUpdateTransactions((prev) => !prev); // Toggle the state to trigger re-fetch
  };
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="/user" element={<Layout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="more" element={<Home1 />} />
            <Route path="viewProfile" element={<ViewProfile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route
              path="withdraw"
              element={
                <WithdrawPage onTransactionUpdate={handleTransactionUpdate} />
              }
            />
            <Route
              path="deposit"
              element={
                <DepositPage onTransactionUpdate={handleTransactionUpdate} />
              }
            />
            <Route
              path="history"
              element={
                <TransactionHistory updateTrigger={updateTransactions} />
              }
            />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route
              path="userhistory/:username"
              element={<UserTransactionDetails />}
            />
            <Route path="users" element={<ViewUsers />} />
            <Route path="viewprofile/:username" element={<ViewUserProfile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
