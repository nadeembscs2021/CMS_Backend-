import bcrypt from "bcryptjs";
import { errorHandler } from "../middlewares/error.js";
import Admin from "../models/Admin.model.js";
import Parent from "../models/Parent.model.js";
import Student from "../models/Student.model.js";
import Teacher from "../models/Teacher.model.js";

export const LoginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await Admin.findOne({ username });
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
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfuly",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginTeacher = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await Teacher.findOne({ username });
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
    return res.status(200).json({
      success: true,
      message: "Teacher logged in successfuly",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginParent = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await Parent.findOne({ username });
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
    return res.status(200).json({
      success: true,
      message: "Parent logged in successfuly",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginStudent = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await Student.findOne({ username });
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
    return res.status(200).json({
      success: true,
      message: "Student logged in successfuly",
      data: userExists,
    });
  } catch (error) {
    next(error);
  }
};
