import express from "express";
import { 
  createStudent, 
  getStudents, 
  updateStudent, 
  deleteStudent 
} from "../controllers/student/studentController.js";
// import isLoggedIn from "../middlewares/isloggedIn.js";
// import isAdmin from "../middlewares/adminRole.js";

const router = express.Router();

// Apply middleware if needed for security
router.post("/add", createStudent);
router.get("/get", getStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
