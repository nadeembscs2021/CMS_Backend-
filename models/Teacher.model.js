import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    bloodType: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
