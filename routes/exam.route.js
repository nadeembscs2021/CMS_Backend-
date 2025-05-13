import { Router } from "express";
import {
  CreateNewExam,
  DeleteExamById,
  GetAllExams,
  GetExamById,
  UpdateExamById,
} from "../controllers/exam.controller.js";

const router = Router();

router.post("/", CreateNewExam);
router.get("/", GetAllExams);
router.get("/:id", GetExamById);
router.put("/:id", UpdateExamById);
router.delete("/:id", DeleteExamById);

export default router;
