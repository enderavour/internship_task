import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const CourseForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    setTitleError(false);

    onSubmit({
      title: title.trim(),
      description: description.trim()
    });

    setTitle("");
    setDescription("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      <TextField
        label="Course title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          if (event.target.value.trim()) {
            setTitleError(false);
          }
        }}
        error={titleError}
        helperText={titleError ? "Course title is required" : ""}
        required
        fullWidth
      />

      <TextField
        label="Description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <Button
        type="submit"
        variant="outlined"
      >
        Create Course
      </Button>
    </Box>
  );
};
