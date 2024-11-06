import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  adhar: { type: String, required: true },
  pancard: { type: String, required: true },
  password: { type: String, required: true },
  initialAmount: { type: Number, default: 0 },
  age: { type: Number, required: true },
  dob: { type: Date, required: true },
  image: { type: String },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);
export default User;
