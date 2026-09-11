import { configureStore } from "@reduxjs/toolkit";
import { courseApi } from "../services/courseApi";
import { lessonApi } from "../services/lessonApi";

export const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseApi.middleware)
      .concat(lessonApi.middleware)

});
