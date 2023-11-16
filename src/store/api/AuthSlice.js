import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"
import BASE_URL from "./BASE_URL"

const setToken = (token) => {
    Cookies.set("token", token, {expires: 7})
}

export const authSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    tagTypes: ["userApi"],
    endpoints: (builder) => ({
        // sign up
        signUp: builder.mutation({
            query: (newUser) => ({
                url: "users/signup",
                method: "POST",
                body: newUser
            }),
            invalidatesTags: ["userApi"]
        }),
        // login
        login: builder.mutation({
            query: (user) => ({
                url: "users/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["userApi"],

            onQueryStarted: async (arg, {queryFulfilled }) => {
               try {
                 const result = await queryFulfilled
                 setToken(result.data.token)
                 console.log("result login:", result)
               } catch (error) {
                 console.log("error login: ", error)
               }
            }
        })
    })
})

export const {useSignUpMutation, useLoginMutation} = authSlice

export default authSlice.reducer