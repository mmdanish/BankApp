import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/bank.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [focused, setFocused] = useState({});
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    adhar: "",
    password: "",
    username: "",
    email: "",
    age: "",
    dob: "",
    pancard: "",
    confirm_password: "",
    initialAmount: "",
  });
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleFocus = (field) =>
    setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setFocused((prev) => ({ ...prev, [field]: false }));

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ""); // Set file name when a file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(values.password)) {
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 digit, and 1 symbol."
      );
      return;
    }

    if (values.password !== values.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    formData.append("image", image);

    try {
      await axios.post("http://localhost:4000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("User registered successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };


  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Left side (image) */}
      <div className="w-1/3 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={Image}
          alt="Bank"
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Right side (form) */}
      <div className="w-2/3 bg-white flex items-center justify-center h-full overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="w-5/6 max-w-2xl bg-[#87B4A6] p-10 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Left column inputs */}
            <div className="space-y-4">
              <InputField
                label="Name"
                name="name"
                value={values.name}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.name}
              />
              <InputField
                label="Address"
                name="address"
                value={values.address}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.address}
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={values.phone}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.phone}
              />
              <InputField
                label="Aadhaar Number"
                name="adhar"
                value={values.adhar}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.adhar}
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={values.password}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.password}
                showToggle={true}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <div className="relative mt-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image"
                  className="flex items-center w-full bg-transparent px-4 py-2 mt-12 border-black text-black cursor-pointer transition-all duration-300 hover:underline"
                >
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Upload Image
                </label>
                {fileName && (
                  <p className="text-sm text-gray-700 mt-2">
                    Selected file: {fileName}
                  </p>
                )}
              </div>
            </div>

            {/* Right column inputs */}
            <div className="space-y-4">
              <InputField
                label="Username"
                name="username"
                value={values.username}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.username}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.email}
              />
              <InputField
                label="Age"
                name="age"
                type="number"
                value={values.age}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.age}
              />
              <div className="relative">
                <label className="block text-sm mb-2 text-black">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-4 py-2 border-b-2 border-black focus:outline-none focus:ring-0 transition-all"
                />
              </div>
              <InputField
                label="Initial Amount"
                name="initialAmount"
                type="number"
                value={values.initialAmount}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.initialAmount}
              />
              <InputField
                label="Pancard Number"
                name="pancard"
                value={values.pancard}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.pancard}
              />
              <InputField
                label="Confirm Password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirm_password}
                handleChange={handleChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                focused={focused.confirm_password}
                showToggle={true}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/3 bg-[#D9D9D9] text-black py-3 rounded-lg mt-8 transition duration-300"
            >
              Register
            </button>
          </div>

          <p className="text-center text-black mt-8">
            Already have an account?{" "}
            <Link to="/" className="text-black underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Input field component
function InputField({
  label,
  name,
  type = "text",
  value,
  handleChange,
  handleFocus,
  handleBlur,
  focused,
  showToggle,
  showPassword,
  setShowPassword,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
        onFocus={() => handleFocus(name)}
        onBlur={() => handleBlur(name)}
        className="w-full bg-transparent px-4 py-2 border-b-2 border-black focus:outline-none focus:ring-0 transition-all"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 top-2 transition-all duration-300 ${
          focused || value ? "-translate-y-5 scale-75" : "text-black"
        }`}
      >
        {label}
      </label>

      {/* Show/Hide Password Icon */}
      {showToggle && (
        <span
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      )}
    </div>
  );
}

export default RegisterPage;
