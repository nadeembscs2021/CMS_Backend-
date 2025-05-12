import { Router } from "express";
import { LoginStudent } from "../controllers/auth.controller.js";
import {
  CreateNewStudent,
  DeleteStudentById,
  GetAllStudents,
  GetStudentById,
  UpdateStudentById,
} from "../controllers/student.controller.js";

const router = Router();

router.post("/login", LoginStudent);
router.post("/", CreateNewStudent);
router.get("/", GetAllStudents);
router.get("/:id", GetStudentById);
router.put("/:id", UpdateStudentById);
router.delete("/:id", DeleteStudentById);

export default router;
