import { prisma } from "../lib/prisma.js";
import { createLessonSchema, updateLessonSchema } from "../schemas/lesson.js";

export const getLessons = async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    const lessons = await prisma.lesson.findMany({
      where: {
        courseId: courseId
      },
      orderBy: {
        id: "asc"
      }
    });

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error getting lessons"
    });
  }
};

export const createLesson = async (req, res) => {
  const result = createLessonSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues
    });
  }

  try {
    const { title, isCompleted } = result.data;

    const courseId = Number(req.params.courseId);

    const course = await prisma.course.findUnique({
      where: {
        id: courseId
      },
    });

    if (!course) {
      return res.status(404).json({
        error: "Course not found"
      });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title: result.data.title,
        isCompleted: result.data.isCompleted,
        courseId: courseId
      }
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error creating lesson"
    });
  }
};

export const updateLesson = async (req, res) => {
  const result = updateLessonSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues
    });
  }

  try {
    const id = Number(req.params.id);

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id
      }
    });

    if (!lesson) {
      return res.status(404).json({
        error: "Lesson not found"
      });
    }

    const updatedLesson = await prisma.lesson.update({
      where: {
        id: id
      },
      data: result.data
    });

    res.json(updatedLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error updating lesson"
    });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id
      }
    });

    if (!lesson) {
      return res.status(404).json({
        error: "Lesson not found"
      });
    }

    await prisma.lesson.delete({
      where: {
        id: id
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error deleting lesson"
    });
  }
};
