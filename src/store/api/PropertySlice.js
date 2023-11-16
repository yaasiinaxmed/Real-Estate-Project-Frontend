import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./BASE_URL";
import Cookies from "js-cookie";

const getToken = () => {
    return Cookies.get("token")
}

export const propertySlice = createApi({
    reducerPath: "property",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken()

            if(token) {
                headers.set("Authorization", `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["property"],
    endpoints: (builder) => ({
        // get properties
        getProperties: builder.query({
            query: () => "properties",
            providesTags: ["property"]
        })
    })
})

export const {useGetPropertiesQuery} = propertySlice