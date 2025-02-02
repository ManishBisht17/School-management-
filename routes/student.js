import { createStudent, studentLogin } from "../controller/student.js";
import express from "express";

const router = express.Router();

router.post("/create", createStudent);
router.post("/login", studentLogin);

export default router;
