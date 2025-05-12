import { Router } from "express";
import { LoginAdmin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", LoginAdmin);

export default router;
