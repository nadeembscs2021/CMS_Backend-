import Teacher from "../models/Teacher.model.js";

export const CreateNewTeacher = async (req, res, next) => {
  const {
    name,
    subject,
    classId,
    phone,
    address,
    bloodType,
    birthDate,
    gender,
  } = req.body;
  try {
    const newTeacher = new Teacher({
      name,
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
      success: false,
      message: "Teacher created successfuly",
      data: newTeacher,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
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
    const teacherExists = await Teacher.findOne({ _id: id });
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
    name,
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
    teacherExists.name = name;
    teacherExists.subject = subject;
    teacherExists.classId = classId;
    teacherExists.phone = phone;
    teacherExists.address = address;
    teacherExists.bloodType = bloodType;
    teacherExists.birthDate = birthDate;
    teacherExists.gender = gender;
    await teacherExists.save();
    return res.status(200).json({
      success: true,
      message: "Teacher updated successfuly",
      data: teacherExists,
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
