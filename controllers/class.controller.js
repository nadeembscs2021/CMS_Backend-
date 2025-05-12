import { errorHandler } from "../middlewares/error.js";
import Class from "../models/Class.model.js";
import Subject from "../models/Subject.model.js";

export const CreateNewClass = async (req, res, next) => {
  const { className, section, capacity } = req.body;
  try {
    const classExists = await Class.findOne({ className, section });
    if (classExists) {
      return next(errorHandler(400, "Class already exists"));
    }
    const newClass = new Class({
      className,
      section,
      capacity,
    });
    await newClass.save();
    if (!newClass) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(201).json({
      success: true,
      message: "Class created successfuly",
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    return res.status(200).json({
      success: true,
      message: "Classes fetched successfuly",
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

export const GetClassById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const classExists = await Class.findOne({ _id: id });
    if (!classExists) {
      return next(errorHandler(400, "Class not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Class fetched successfuly",
      data: classExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateClassById = async (req, res, next) => {
  const { id } = req.params;
  const { className, capacity, section } = req.body;
  try {
    const classExists = await Class.findOne({ _id: id });
    if (!classExists) {
      return next(errorHandler(400, "Class not found"));
    }

    const updatedClass = await Class.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          className,
          section,
          capacity,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Class updated successfuly",
      data: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteClassById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const classExists = await Class.findOne({ _id: id });
    if (!classExists) {
      return next(errorHandler(400, "Class not found"));
    }
    await Class.deleteOne({ _id: id });

    await Subject.deleteMany({ classId: id });

    return res.status(200).json({
      success: true,
      message: "Class and its subjects deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
