import { Router } from "express";
import { LoginParent } from "../controllers/auth.controller.js";
import {
  CreateNewParent,
  DeleteParentById,
  GetAllParents,
  GetParentById,
  UpdateParentById,
} from "../controllers/parent.controller.js";

const router = Router();

router.post("/login", LoginParent);
router.post("/", CreateNewParent);
router.get("/", GetAllParents);
router.get("/:id", GetParentById);
router.put("/:id", UpdateParentById);
router.delete("/:id", DeleteParentById);

export default router;
