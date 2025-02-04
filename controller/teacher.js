import Teacher from "../models/teacher.js";
import bcrypt from "bcrypt";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    // Generate a salt and hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new Teacher with the hashed password
    const newTecher = new Teacher({
      name,
      email,
      password: hashedPassword,
      subject,
    });
    await newTecher.save();

    res.status(201).json({
      message: "Student Account Created Successfully",
      data: teacherData,
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
    const loginTecher = await Teacher.findOne({ email });

    if (!loginTecher) {
      return res.status(401).json({
        message: "Teacher does not found with this id ",
      });
    }

    const isMatched = await bcrypt.compare(password, loginTecher.password);
    if (!isMatched) {
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
