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

    res.status(201).json({
      message: "Student Account Created Successfully",
      data: newStudent,
    });
  } catch (error) {
    console.error("Error in student creation:", error);
    res.status(500).json({
      message: "There was an error creating the student account",
    });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const loginStudent = await Student.findOne({ email });

    // Check if the student exists
    if (!loginStudent) {
      return res.status(401).json({
        message: "Invalid email or password", // Avoid revealing that the user doesn't exist
      });
    }

    // Compare the provided password with the hashed password in the database
    const matchPassword = await bcrypt.compare(password, loginStudent.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // If everything is correct, return a success response
    res.status(200).json({
      message: "Student login successful",
      data: {
        id: loginStudent._id,
        email: loginStudent.email,
        name: loginStudent.name,
      },
    });
  } catch (error) {
    console.error("Error in student login:", error);
    res.status(500).json({
      message: "An error occurred during login",
    });
  }
};
