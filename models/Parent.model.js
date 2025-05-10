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
      ref: "student",
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Parent = mongoose.model("parent", parentSchema);
export default Parent;
