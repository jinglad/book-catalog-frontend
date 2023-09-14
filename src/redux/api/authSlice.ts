import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query({
      query: ({ token }: { token: string }) => ({
        url: "/api/v1/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } =
  authSlice;
