import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6308-83-222-7-214.ngrok-free.app/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories/`,
    }),

    RefreshToken: builder.mutation({
      query: (orderData) => ({
        url: "/refresh",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useRefreshTokenMutation,
} = api;

export default api;
