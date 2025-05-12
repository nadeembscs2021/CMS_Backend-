import { Router } from "express";
import {
  CreateNewClass,
  DeleteClassById,
  GetAllClasses,
  GetClassById,
  UpdateClassById,
} from "../controllers/class.controller.js";

const router = Router();

router.post("/", CreateNewClass);
router.get("/", GetAllClasses);
router.get("/:id", GetClassById);
router.put("/:id", UpdateClassById);
router.delete("/:id", DeleteClassById);

export default router;
