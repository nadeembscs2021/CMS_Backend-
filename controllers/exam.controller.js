import { errorHandler } from "../middlewares/error.js";
import Exam from "../models/Exam.model.js";

export const CreateNewExam = async (req, res, next) => {
  const { title, classId, subject, teacher, startDate, endDate, duration } =
    req.body;
  try {
    const examExists = await Exam.findOne({ title });
    if (examExists) {
      return next(errorHandler(400, "Exam already exists"));
    }

    const newExam = new Exam({
      title,
      classId,
      subject,
      teacher,
      startDate,
      endDate,
      duration,
    });
    await newExam.save();
    if (!newExam) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(201).json({
      success: true,
      message: "Exam created successfuly",
      data: newExam,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({})
      .populate("classId", "className section")
      .populate("subject", "name")
      .populate("teacher", "name");
    if (!exams) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(200).json({
      success: true,
      message: "Exams fetched successfuly",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

export const GetExamById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const examExists = await Exam.findOne({ _id: id })
      .populate("classId")
      .populate("subject")
      .populate("teacher");
    if (!examExists) {
      return next(errorHandler(400, "Exam not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Exam fetched successfuly",
      data: examExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateExamById = async (req, res, next) => {
  const { id } = req.params;
  const { title, classId, subject, teacher, startDate, endDate, duration } =
    req.body;
  try {
    const examExists = await Exam.findOne({ _id: id });
    if (!examExists) {
      return next(errorHandler(400, "Exam not found"));
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          classId,
          subject,
          teacher,
          startDate,
          endDate,
          duration,
        },
      },
      { new: true }
    );

    if (!updatedExam) {
      return next(errorHandler(400, "Something went wrong"));
    }

    return res.status(200).json({
      success: true,
      message: "Exam updated successfuly",
      data: updatedExam,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteExamById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const examExists = await Exam.findOne({ _id: id });
    if (!examExists) {
      return next(errorHandler(400, "Exam not found"));
    }
    await Exam.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Exam deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
