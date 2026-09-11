import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lessonApi = createApi({
  reducerPath: "lessonApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),

  tagTypes: ["Lesson"],

  endpoints: (builder) => ({
    getLessons: builder.query({
      query: (courseId) => `/courses/${courseId}/lessons`,

      providesTags: (result, error, courseId) => [
        {
          type: "Lesson",
          id: courseId,
        },
      ],
    }),

    createLesson: builder.mutation({
      query: ({ courseId, lesson }) => ({
        url: `/courses/${courseId}/lessons`,
        method: "POST",
        body: lesson,
      }),

      invalidatesTags: (result, error, { courseId }) => [
        {
          type: "Lesson",
          id: courseId,
        },
      ],
    }),

    updateLesson: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Lesson"],
    }),

    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Lesson"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
