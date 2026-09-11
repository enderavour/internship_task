import {
  Box,
  Checkbox,
  IconButton,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const LessonList = ({
  lessons,
  onToggleLesson,
  onDeleteLesson
}) => {
  if (lessons.length === 0) {
    return (
      <Typography color="text.secondary">
        No lessons yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {lessons.map((lesson) =>
        <Box
          key={lesson.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            px: 1,
            py: 0.5
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={lesson.isCompleted}
              onChange={() => onToggleLesson(lesson)}
            />

            <Typography
              sx={{
                textDecoration: lesson.isCompleted
                  ? "line-through"
                  : "none",
                color: lesson.isCompleted
                  ? "text.secondary"
                  : "text.primary"
              }}
            >
              {lesson.title}
            </Typography>
          </Box>

          <IconButton
            color="error"
            onClick={() => onDeleteLesson(lesson.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
