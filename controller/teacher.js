import teacher from "../models/teacher.js";

export const createTeacher = async (req, res) => {
   try{
    const { name , subject,password , email  } = req.body;
    const newTeacher=  await teacher({name,subject,password,email}).save();
                     
    res.status(201).json({
      message:'new account has been created successfully',
      data: newTeacher

    })
   }catch(err){
      console.log(err)
    res.status(500).json({
      message: 'error occuring in createTeacher function '
    })
   }
}


