import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export const CourseList = ({
  courses,
  selectedCourseId,
  onSelect,
  onDelete,
}) => {
  return (
    <Stack spacing={2}>
      {courses.map((course) => {
        const isSelected = selectedCourseId === course.id;

        return (
          <Card
            key={course.id}
            variant="outlined"
            sx={{
              borderColor: isSelected
                ? "primary.main"
                : "divider",
              borderWidth: isSelected ? 2 : 1,
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {course.title}
              </Typography>

              {course.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {course.description}
                </Typography>
              )}
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                onClick={() => onSelect(course.id)}
              >
                Open
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(course.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
};
