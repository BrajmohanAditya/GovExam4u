import Student from "../../models/student.js";
import ExpressError from "../../utils/ExpressError.js";
import wrapAsync from "../../utils/wrapAsync.js";

export const createStudent = wrapAsync(async (req, res, next) => {
  const { name, studentClass, status, whatsappNo, email } = req.body;
  
  if (!name || !studentClass || !whatsappNo || !email) {
    return next(new ExpressError("All fields except status are required", 400));
  }
  
  const newStudent = new Student({ name, studentClass, status, whatsappNo, email });
  await newStudent.save();
  
  res.status(201).json({ success: true, message: "Student created successfully", data: newStudent });
});

export const getStudents = wrapAsync(async (req, res, next) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: students });
});

export const updateStudent = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, studentClass, status, whatsappNo, email } = req.body;
  
  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { name, studentClass, status, whatsappNo, email },
    { new: true }
  );

  if (!updatedStudent) {
    return next(new ExpressError("Student not found", 404));
  }

  res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
});

export const deleteStudent = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(id);
  
  if (!deletedStudent) {
    return next(new ExpressError("Student not found", 404));
  }
  
  res.status(200).json({ success: true, message: "Student deleted successfully" });
});
