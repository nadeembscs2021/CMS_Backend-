import { errorHandler } from "../middlewares/error.js";
import Result from "../models/Result.model.js";

export const CreateNewResult = async (req, res, next) => {
  const { title, studentId, classId, subject, marks, teacher } = req.body;
  try {
    const resultExists = await Result.findOne({ title });

    if (resultExists) {
      return next(errorHandler(400, "Result already exists"));
    }
    const newResult = new Result({
      title,
      studentId,
      classId,
      subject,
      marks,
      teacher,
    });
    await newResult.save();
    if (!newResult) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(201).json({
      success: true,
      message: "Result created successfuly",
      data: newResult,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllResults = async (req, res, next) => {
  try {
    const results = await Result.find({});
    if (!results) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(200).json({
      success: true,
      message: "Results fetched successfuly",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

export const GetResultById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resultExists = await Result.findOne({ _id: id })
      .populate("studentId")
      .populate("classId")
      .populate("subject")
      .populate("teacher");
    if (!resultExists) {
      return next(errorHandler(400, "Result not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Result fetched successfuly",
      data: resultExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateResultById = async (req, res, next) => {
  const { id } = req.params;
  const { title, studentId, classId, subject, marks, teacher } = req.body;
  try {
    const resultExists = await Result.findOne({ _id: id });
    if (!resultExists) {
      return next(errorHandler(400, "Result not found"));
    }
    const updatedResult = await Result.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          studentId,
          classId,
          subject,
          marks,
          teacher,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Result updated successfuly",
      data: updatedResult,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteResultById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resultExists = await Result.findOne({ _id: id });
    if (!resultExists) {
      return next(errorHandler(400, "Result not found"));
    }
    await Result.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Result deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
