import express from "express";
import "dotenv/config";
import { router as courseRouter } from "./routes/course.js";
import { router as lessonRouter } from "./routes/lesson.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/courses", courseRouter);
app.use("/", lessonRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
