import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./BASE_URL";
import Cookies from "js-cookie";

const getToken = () => {
  return Cookies.get("token");
};

export const propertySlice = createApi({
  reducerPath: "property",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["property"],
  endpoints: (builder) => ({
    // Get properties
    getProperties: builder.query({
      query: () => "properties",
      providesTags: ["property"],
    }),

    // Create property
    addProperty: builder.mutation({
      query: (newProperty) => ({
        url: "properties/create",
        method: "POST",
        body: newProperty,
      }),
      invalidatesTags: ["property"],
    }),

    // Update property
    editProperty: builder.mutation({
      query: ({ property, id }) => ({
        url: `properties/update/${id}`,
        method: "PUT",
        body: property,
      }),
      invalidatesTags: ["property"],
    }),

    // Delete property
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `properties/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["property"],
    }),

    // Send request
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `properties/${id}/send_request`,
        method: "POST",
      }),
      invalidatesTags: ["property"],
    }),

    // Get requests
    getRequests: builder.query({
      query: () => "properties/requests",
      providesTags: ["property"],
    }),

    // Approve to requests
    approve: builder.mutation({
      query: (id) => ({
        url: `properties/requests/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["property"],
    }),

    // Get transactions
    getTransactions: builder.query({
      query: () => "properties/transactions",
      providesTags: ["property"],
    }),
  }),
});

export const { useGetPropertiesQuery } = propertySlice;
