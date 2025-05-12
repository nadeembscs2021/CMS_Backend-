import { Router } from "express";
import {
  CreateNewSubject,
  DeleteSubjectById,
  GetAllSubjects,
  GetSubjectById,
  UpdateSubjectById,
} from "../controllers/subject.controller.js";

const router = Router();

router.post("/", CreateNewSubject);
router.get("/", GetAllSubjects);
router.get("/:id", GetSubjectById);
router.put("/:id", UpdateSubjectById);
router.delete("/:id", DeleteSubjectById);

export default router;
