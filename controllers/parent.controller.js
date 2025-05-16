import { errorHandler } from "../middlewares/error.js";
import Parent from "../models/Parent.model.js";
import bcrypt from "bcryptjs";

export const CreateNewParent = async (req, res, next) => {
  const {
    fatherName,
    motherName,
    studentId,
    phone,
    address,
    username,
    password,
  } = req.body;
  try {
    const parentExists = await Parent.findOne({ username });
    if (parentExists) {
      return next(errorHandler(400, "Parent already exists"));
    }

    const studentExists = await Parent.findOne({ studentId });
    if (!studentExists) {
      return next(
        errorHandler(400, "Student already belongs to another parent")
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newParent = new Parent({
      fatherName,
      motherName,
      studentId,
      phone,
      address,
      username,
      password: hashedPassword,
    });

    await newParent.save();
    return res.status(200).json({
      success: true,
      message: "Parent created successfuly",
      data: newParent,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllParents = async (req, res, next) => {
  try {
    const parents = await Parent.find({}).populate("studentId", "name");
    if (!parents) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(200).json({
      success: true,
      message: "Parents fetched successfuly",
      data: parents,
    });
  } catch (error) {
    next(error);
  }
};

export const GetParentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parentExists = await Parent.findOne({ _id: id }).populate(
      "studentId"
    );
    if (!parentExists) {
      return next(errorHandler(400, "Parent not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Parent fetched successfuly",
      data: parentExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateParentById = async (req, res, next) => {
  const { id } = req.params;
  const {
    fatherName,
    motherName,
    studentId,
    phone,
    address,
    username,
    password,
  } = req.body;
  try {
    const parentExists = await Parent.findOne({ _id: id });
    if (!parentExists) {
      return next(errorHandler(400, "Parent not found"));
    }

    let hashedPassword;
    if (password && password !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedParent = await Parent.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          fatherName,
          motherName,
          studentId,
          phone,
          address,
          username,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Parent updated successfuly",
      data: updatedParent,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteParentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parentExists = await Parent.findOne({ _id: id });
    if (!parentExists) {
      return next(errorHandler(400, "Parent not found"));
    }
    await Parent.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Parent deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
