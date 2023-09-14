/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { config } from "../../config/config";
import { IBookData } from "../../interface/book.interface";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  tagTypes: ["reviews", "books", "singleBook"],
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (body) => ({
        url: "/api/v1/books",
        method: "POST",
        body: body.book,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: ["books"],
    }),
    getBooks: builder.query<IBookData, void>({
      query: (arg) => ({
        url: "/api/v1/books",
        method: "GET",
        params: { ...(arg as any) },
      }),
      providesTags: ["books"],
    }),
    getBook: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/api/v1/books/${id}`,
        method: "GET",
      }),
      providesTags: ["reviews", "singleBook"],
    }),
    updateBook: builder.mutation({
      query: (body) => ({
        url: `/api/v1/books/${body?.book.id}`,
        method: "PATCH",
        body: body.book,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: ["books", "singleBook"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/api/v1/books/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["reviews"],
    }),
    deleteBook: builder.mutation({
      query: (obj) => ({
        url: `/api/v1/books/${obj.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  useUpdateBookMutation,
  useAddReviewMutation,
  useDeleteBookMutation,
} = bookApi;
