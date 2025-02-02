import teacher from "../models/teacher.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, subject, password, email } = req.body;
    const newTeacher = await teacher({ name, subject, password, email }).save();

    res.status(201).json({
      message: "new account has been created successfully",
      data: newTeacher,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error occuring in createTeacher function ",
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
