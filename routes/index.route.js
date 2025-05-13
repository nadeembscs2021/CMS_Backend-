import { Router } from "express";
import adminRoutes from "./admin.route.js";
import parentRoutes from "./parent.route.js";
import studentRoutes from "./student.route.js";
import teacherRoutes from "./teacher.route.js";
import classRoutes from "./class.route.js";
import subjectRoutes from "./subject.route.js";
import examRoutes from "./exam.route.js";
import resultRoutes from "./result.route.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/parent", parentRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);

router.use("/class", classRoutes);
router.use("/subject", subjectRoutes);
router.use("/exam", examRoutes);
router.use("/result", resultRoutes);

export default router;
