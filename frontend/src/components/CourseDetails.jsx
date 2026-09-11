import { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography
} from "@mui/material";

import { LessonList } from "./LessonList";

export const CourseDetails = ({
  course,
  lessons,
  loading,
  progress,
  onCreateLesson,
  onToggleLesson,
  onDeleteLesson
}) => {
  const [lessonTitle, setLessonTitle] = useState("");

  const completedLessons = lessons.filter(
    (lesson) => lesson.isCompleted
  ).length;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!lessonTitle.trim())
      return;

    onCreateLesson(lessonTitle.trim());
    setLessonTitle("");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3
        }}
      >
        <Box>
          <Typography variant="h4">
            {course.title}
          </Typography>

          {course.description && (
            <Typography
              color="text.secodary"
              sx={{ mt: 1 }}
            >
              {course.description}
            </Typography>
          )}
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {progress}%
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography variant="h6">
          Lessons
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {completedLessons} / {lessons.length} completed
        </Typography>
      </Box>

      {loading ? (
        <Typography color="text.secondary">
          Loading lessons...
        </Typography>
      ) : (
        <LessonList
          lessons={lessons}
          onToggleLesson={onToggleLesson}
          onDeleteLesson={onDeleteLesson}
        />
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          mt: 3
        }}
      >
        <TextField
          label="New Lesson"
          value={lessonTitle}
          onChange={(event) =>
            setLessonTitle(event.target.value)
          }
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          Add lesson
        </Button>
      </Box>
    </Box>
  );
};
