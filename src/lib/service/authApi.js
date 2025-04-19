import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://scholarium.pythonanywhere.com/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "token/",
        method: "POST",
        body: data,
      }),
    }),
    
    tokenVerify: builder.query({
      query: () => ({
        url: "/staff/get_me/",
    
      }),
    }),

    refreshToken: builder.mutation({
      query: (refresh) => ({
        url: "/token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const {
  useTokenVerifyQuery,
  useRefreshTokenMutation,
  useLoginMutation,
} = AuthApi;

export default AuthApi;
