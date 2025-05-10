import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: ["admin", "teacher", "student", "parent"],
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
