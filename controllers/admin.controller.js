import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

export const GetAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({
      success: true,
      message: "Admins fetched successfuly",
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminExists = await Admin.findOne({ _id: id });
    if (!adminExists) {
      return next(errorHandler(400, "Admin not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Admin fetched successfuly",
      data: adminExists,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adminExists = await Admin.findOne({ _id: id });
    if (!adminExists) {
      return next(errorHandler(400, "Admin not found"));
    }
    await Admin.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Admin deleted successfuly",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateAdminById = async (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ _id: id });
    if (!adminExists) {
      return next(errorHandler(400, "Admin not found"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    adminExists.username = username;
    adminExists.password = hashedPassword;
    await adminExists.save();
    return res.status(200).json({
      success: true,
      message: "Admin updated successfuly",
      data: adminExists,
    });
  } catch (error) {
    next(error);
  }
};
