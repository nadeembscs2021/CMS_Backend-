import { errorHandler } from "../middlewares/error.js";
import Teacher from "../models/Teacher.model.js";
import bcrypt from "bcryptjs";

export const CreateNewTeacher = async (req, res, next) => {
  const {
    username,
    password,
    name,
    email,
    subject,
    classId,
    phone,
    address,
    bloodType,
    birthDate,
    gender,
  } = req.body;
  try {
    const teacherExists = await Teacher.findOne({ username });
    if (teacherExists) {
      return next(errorHandler(400, "Teacher already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      username,
      password: hashedPassword,
      name,
      email,
      subject,
      classId,
      phone,
      address,
      bloodType,
      birthDate,
      gender,
    });

    await newTeacher.save();
    if (!newTeacher) {
      return next(errorHandler(400, "Something went wrong"));
    }

    return res.status(201).json({
      success: true,
      message: "Teacher created successfuly",
      data: newTeacher,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({});
    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfuly",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

export const GetTeacherById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacherExists = await Teacher.findOne({ _id: id })
      .populate("classId")
      .populate("subject");
    if (!teacherExists) {
      return next(errorHandler(400, "Teacher not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Teacher fetched successfuly",
      data: teacherExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTeacherById = async (req, res, next) => {
  const { id } = req.params;
  const {
    username,
    password,
    name,
    email,
    subject,
    classId,
    phone,
    address,
    bloodType,
    birthDate,
    gender,
  } = req.body;
  try {
    const teacherExists = await Teacher.findOne({ _id: id });
    if (!teacherExists) {
      return next(errorHandler(400, "Teacher not found"));
    }

    let hashedPassword;
    if (password && password !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username,
          password: hashedPassword,
          name,
          email,
          subject,
          classId,
          phone,
          address,
          bloodType,
          birthDate,
          gender,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Teacher updated successfuly",
      data: updatedTeacher,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTeacherById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacherExists = await Teacher.findOne({ _id: id });
    if (!teacherExists) {
      return next(errorHandler(400, "Teacher not found"));
    }
    await Teacher.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
