import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
