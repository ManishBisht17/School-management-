
import express from 'express'
import { createTeacher }from '../controller/teacher.js'
const router = express.Router();

router.post('/create', createTeacher);

export default router;
