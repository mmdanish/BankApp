import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 underline">
          Go back to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;