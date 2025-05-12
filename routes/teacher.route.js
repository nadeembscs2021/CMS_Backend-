import { Router } from "express";
import { LoginTeacher } from "../controllers/auth.controller.js";
import {
  CreateNewTeacher,
  DeleteTeacherById,
  GetAllTeachers,
  GetTeacherById,
  UpdateTeacherById,
} from "../controllers/teacher.controller.js";

const router = Router();

router.post("/login", LoginTeacher);
router.post("/", CreateNewTeacher);
router.get("/", GetAllTeachers);
router.get("/:id", GetTeacherById);
router.put("/:id", UpdateTeacherById);
router.delete("/:id", DeleteTeacherById);

export default router;
