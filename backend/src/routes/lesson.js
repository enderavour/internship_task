import { Router } from "express";
import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson
} from "../controllers/lesson.js";

const router = Router();

router.get("/courses/:courseId/lessons", getLessons);
router.post("/courses/:courseId/lessons", createLesson);
router.patch("/lessons/:id", updateLesson);
router.delete("/lessons/:id", deleteLesson);

export { router };
