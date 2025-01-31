import createStudent from '../controller/student.js'
import express from 'express'

const router = express.Router();

router.post('/create', createStudent);

export default router;