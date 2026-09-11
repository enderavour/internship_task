import { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Alert,
  Stack
} from "@mui/material";

import {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} from "./services/courseApi";

import {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation
} from "./services/lessonApi";

import { CourseForm } from "./components/CourseForm";
import { CourseList } from "./components/CourseList";
import { CourseDetails } from "./components/CourseDetails";

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const {
    data: courses = [],
    isLoading: coursesLoading,
    error: coursesError,
  } = useGetCoursesQuery();

  const [createCourse] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const {
    data: lessons,
    error: lessonsError,
    isLoading: lessonsLoading,
  } = useGetLessonsQuery(selectedCourseId, {
    skip: selectedCourseId === null,
  });

  console.log("Lessons:", lessons);
  console.log("Is array:", Array.isArray(lessons));
  console.log("Lessons error:", lessonsError);

  const [createLesson] = useCreateLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  const lessonsList = Array.isArray(lessons) ? lessons : [];

  const completedLessons = lessonsList.filter(
    (lesson) => lesson.isCompleted
  ).length;

  const progress =
    lessonsList.length === 0
      ? 0
      : Math.round((completedLessons / lessonsList.length) * 100);


  const handleCreateCourse = async (course) => {
    const newCourse = await createCourse(course).unwrap();

    setSelectedCourseId(newCourse.id);
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id).unwrap();

    if (id === selectedCourseId) {
      setSelectedCourseId(null);
    }
  };

  const handleCreateLesson = async (title) => {
    if (!selectedCourseId) {
      return;
    }

    try {
      await createLesson({
        courseId: selectedCourseId,
        lesson: {
          title,
          isCompleted: false,
        },
      }).unwrap();
    } catch (error) {
      console.log("Create lesson error: ", error);
    }

  };

  const handleToggleLesson = async (lesson) => {
    await updateLesson({
      id: lesson.id,
      data: {
        isCompleted: !lesson.isCompleted,
      },
    }).unwrap();
  };

  const handleDeleteLesson = async (id) => {
    await deleteLesson(id).unwrap();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Course Progress Tracker
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Track your learning progress
      </Typography>

      {coursesError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load courses.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Create a new course
              </Typography>

              <CourseForm
                onSubmit={handleCreateCourse}
              />
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Your courses
              </Typography>

              {coursesLoading ? (
                <Typography color="text.secondary">
                  Loading courses...
                </Typography>
              ) : (
                <CourseList
                  courses={courses}
                  selectedCourseId={selectedCourseId}
                  onSelect={setSelectedCourseId}
                  onDelete={handleDeleteCourse}
                />
              )}
            </Paper>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            {selectedCourse ? (
              <CourseDetails
                course={selectedCourse}
                lessons={lessonsList}
                loading={lessonsLoading}
                progress={progress}
                onCreateLesson={handleCreateLesson}
                onToggleLesson={handleToggleLesson}
                onDeleteLesson={handleDeleteLesson}
              />
            ) : (
              <Typography color="text.secondary">
                Select a course to view its lessons.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
