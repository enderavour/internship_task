import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
} from "../controllers/course.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);

export { router };
