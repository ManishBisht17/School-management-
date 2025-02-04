import Student from "../models/student.js";
import bcrypt from "bcrypt";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate a salt and hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student with the hashed password
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();

    // Remove the password from response for security
    const { password: _, ...studentData } = newStudent.toObject();

    res.status(201).json({
      message: "Student Account Created Successfully",
      data: studentData,
    });
  } catch (error) {
    console.error("Error in student creation:", error);
    res.status(500).json({
      message: "There was an error creating the student account",
    });
  }
};

export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginTecher = await teacher.findOne({ email });

    if (!loginTecher) {
      return res.status(401).json({
        message: "Teacher does not found with this id ",
      });
    }
    if (loginTecher.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      message: "Teacher login successfully ",
      data: loginTecher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There is error in teacher login",
    });
  }
};
