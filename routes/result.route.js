import { Router } from "express";
import {
  CreateNewResult,
  DeleteResultById,
  GetAllResults,
  GetResultById,
  UpdateResultById,
} from "../controllers/result.controller.js";

const router = Router();

router.post("/", CreateNewResult);
router.get("/", GetAllResults);
router.get("/:id", GetResultById);
router.put("/:id", UpdateResultById);
router.delete("/:id", DeleteResultById);

export default router;
