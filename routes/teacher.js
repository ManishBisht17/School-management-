import express from "express";
import { createTeacher, teacherLogin } from "../controller/teacher.js";

const router = express.Router();

router.post("/create", createTeacher);
router.post("/login", teacherLogin);

export default router;
