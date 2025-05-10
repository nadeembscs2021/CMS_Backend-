import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.model.js";
import User from "./models/User.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const admin = new Admin({
  firstName: "Muzammil",
  lastName: "Ahmed",
  email: "admin@123",
});

await admin.save();

const hashedPassword = await bcrypt.hash("admin", 10);

const user = new User({
  username: "admin",
  password: hashedPassword,
  role: "admin",
  profileId: admin._id,
});

await user.save();

console.log("Admin created");

process.exit();
