import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000"
  }),

  tagTypes: ["Course"],

  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Course"]
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course
      }),
      invalidatesTags: ["Course"]
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Course"]
    })
  })
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation
} = courseApi;
