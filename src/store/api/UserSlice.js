import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./BASE_URL";
import Cookies from "js-cookie";

const getToken = () => {
  return Cookies.get("token");
};

export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Berear ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // Get User
    getUser: builder.query({
      query: () => {
        return {
          url: "users/user",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    // Update User 
    updateUser: builder.mutation({
      query: (editUser) => ({
        url: "users/update",
        method: "PUT",
        body: editUser
      }),
      invalidatesTags: ["user"]
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: () => ({
        url: "users/delete",
        method: "DELETE"
      }),
      invalidatesTags: ["user"]
    })
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;

export default userSlice.reducer
