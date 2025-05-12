import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin", 10);

const admin = new Admin({
  firstName: "Muzammil",
  lastName: "Ahmed",
  email: "admin@gmail.com",
  username: "admin",
  password: hashedPassword,
});

await admin.save();

console.log("Admin created");

process.exit();
