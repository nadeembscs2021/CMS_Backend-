import { Router } from "express";
import { CreateNewUser, LoginNewUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", CreateNewUser);
router.post("/login", LoginNewUser);

export default router;
