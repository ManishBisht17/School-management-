import student from "../models/student.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newStudent = await student({ name, email, password }).save();

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
