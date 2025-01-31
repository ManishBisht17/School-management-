import student from '../models/student.js'

export const createStudent = async (req, res)=>{
    try{
    const { name, email, password } = req.body;
    const newStudent = await student({name, email, password}).save();

    res.status(201).json({
        message: "Student Acoount Created Successfully",
        data : newStudent
    })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "There is error in student creation"
        })
    }
}

