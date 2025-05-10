import Subject from "../models/Subject.model.js";

export const CreateNewSubject = async (req, res, next) => {
  const { name, classId } = req.body;
  try {
    const subjectExists = await Subject.findOne({ name, class: classId });
    if (subjectExists) {
      return next(errorHandler(400, "Subject already exists"));
    }

    const newSubject = new Subject({
      name,
      classId,
    });
    await newSubject.save();
    if (!newSubject) {
      return next(errorHandler(400, "Something went wrong"));
    }
    return res.status(201).json({
      success: false,
      message: "Subject created successfuly",
      data: newSubject,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find();
    return res.status(200).json({
      success: true,
      message: "Subjects fetched successfuly",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

export const GetSubjectById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subjectExists = await Subject.findOne({ _id: id });
    if (!subjectExists) {
      return next(errorHandler(400, "Subject not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Subject fetched successfuly",
      data: subjectExists,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateSubjectById = async (req, res, next) => {
  const { id } = req.params;
  const { name, classId } = req.body;
  try {
    const subjectExists = await Subject.findOne({ _id: id });
    if (!subjectExists) {
      return next(errorHandler(400, "Subject not found"));
    }
    subjectExists.name = name;
    subjectExists.classId = classId;
    await subjectExists.save();
    return res.status(200).json({
      success: true,
      message: "Subject updated successfuly",
      data: subjectExists,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteSubjectById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subjectExists = await Subject.findOne({ _id: id });
    if (!subjectExists) {
      return next(errorHandler(400, "Subject not found"));
    }
    await Subject.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Subject deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};
