import student from "../models/student.js";
import bcrypt from "bcrypt";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newStudent = await new student({ name, email, password }).save();
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    res.status(201).json({
      message: "Student Acoount Created Successfully",
      data: newStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There is error in student creation",
    });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginStudent = await student.findOne({ email });
    if (loginStudent.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    if (!loginStudent) {
      return res.status(401).json({
        message: "User does not found",
      });
    }
    res.status(200).json({
      message: "Student login successful ",
      data: loginStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There is error in student login",
    });
  }
};
