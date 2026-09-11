import { prisma } from "../lib/prisma.js";
import { createCourseSchema } from "../schemas/course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const createCourse = async (req, res) => {
  const result = createCourseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues
    });
  }

  try {
    const { title, description } = result.data;

    const newCourse = await prisma.course.create({
      data: {
        title,
        description
      }
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.course.delete({
      where: {
        id: id
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the course" });
  }
};
