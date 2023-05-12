import { Router } from "express";
import { adminAuth } from "../../middlewear/auth.js";
import { AddCourse, ListCourses, addToList, deleteCourse, removeFromList, updateCourse } from "./controller/courses.controller.js";
import { validation } from "../../middlewear/validation.js";
import * as validators from "../courses/course.validatores.js";
import { auth } from "../../middlewear/auth.js";
const router = Router();

router.post("/addCourse",adminAuth(),validation(validators.addcourse), AddCourse);
router.get("/addToList/:id",auth(), addToList);
router.delete("/removeFromList/:id",auth(), removeFromList);
router.get("/mylist",auth(), ListCourses);
router.delete("/deleteCourse/:id",adminAuth(), deleteCourse);
router.put("/updateCourse/:id",adminAuth(),validation(validators.updatecourse), updateCourse);



export default router;