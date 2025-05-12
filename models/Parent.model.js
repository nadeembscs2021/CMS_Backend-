import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "parent",
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model("parent", parentSchema);
export default Parent;
