import { errorHandler } from "../middlewares/error.js";
import Student from "../models/Student.model.js";
import bcrypt from "bcryptjs";

export const CreateNewStudent = async (req, res, next) => {
  const {
    name,
    classId,
    subject,
    phone,
    address,
    email,
    bloodType,
    birthDate,
    gender,
    username,
    password,
  } = req.body;
  try {
    const studentExists = await Student.findOne({ username });
    if (studentExists) {
      return next(errorHandler(400, "Student already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      classId,
      subject,
      phone,
      address,
      email,
      bloodType,
      birthDate,
      gender,
      username,
      password: hashedPassword,
    });
    await newStudent.save();
    if (!newStudent) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(201).json({
      success: true,
      message: "Student created successfuly",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    if (!students) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(200).json({
      success: true,
      message: "Students fetched successfuly",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const GetStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const studentExists = await Student.findOne({ _id: id })
      .populate("classId")
      .populate("subject");
    if (!studentExists) {
      return next(errorHandler(400, "Student not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Student fetched successfuly",
      data: studentExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateStudentById = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    classId,
    subject,
    phone,
    address,
    email,
    bloodType,
    birthDate,
    gender,
    username,
    password,
  } = req.body;
  try {
    const studentExists = await Student.findOne({ _id: id });
    if (!studentExists) {
      return next(errorHandler(400, "Student not found"));
    }

    let hashedPassword;
    if (password && password !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          classId,
          subject,
          phone,
          address,
          email,
          bloodType,
          birthDate,
          gender,
          username,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Student updated successfuly",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const studentExists = await Student.findOne({ _id: id });
    if (!studentExists) {
      return next(errorHandler(400, "Student not found"));
    }
    await Student.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Student deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
