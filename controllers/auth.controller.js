import { errorHandler } from "../middlewares/error.js";
import Admin from "../models/Admin.model.js";
import Parent from "../models/Parent.model.js";
import Student from "../models/Student.model.js";
import Teacher from "../models/Teacher.model.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const CreateNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (!newUser) {
      return next(errorHandler(400, "Something went wrong"));
    }

    return res.status(201).json({
      success: false,
      message: "User created successfuly",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginNewUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return next(errorHandler(400, "Invalid Credentials"));
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!doesPasswordMatch) {
      return next(errorHandler(400, "Invalid Credentials"));
    }

    let profileDetail = null;
    if (userExists.role.includes("admin")) {
      profileDetail = await Admin.findOne({ _id: userExists.profileId });
    } else if (userExists.role.includes("teacher")) {
      profileDetail = await Teacher.findOne({ _id: userExists.profileId });
    } else if (userExists.role.includes("student")) {
      profileDetail = await Student.findOne({ _id: userExists.profileId });
    } else if (userExists.role.includes("parent")) {
      profileDetail = await Parent.findOne({ _id: userExists.profileId });
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfuly",
      data: profileDetail,
    });
  } catch (error) {
    next(error);
  }
};
