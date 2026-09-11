import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(1),
  isCompleted: z.boolean()
});

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  isCompleted: z.boolean().optional()
});
