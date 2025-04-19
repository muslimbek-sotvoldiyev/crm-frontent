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

    getCategoriesId: builder.query({
      query: ({ id }) => `categories/${id}/`,
    }),

    getProducts: builder.query({
      query: () => `products/`,
    }),

    getProductId: builder.query({
      query: ({ id }) => `products/${id}/`,
    }),

    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/toggle/${productId}`,
        method: "POST",
      }),
    }),

    deleteWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: "DELETE",
      }),
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: `wishlist/clear`,
        method: "DELETE",
      }),
    }),

    getWishlist: builder.query({
      query: () => "wishlist",
    }),

    searchProducts: builder.query({
      query: (searchTerm) =>
        `products/search?query=${encodeURIComponent(searchTerm)}`,
    }),

    AddCartItem: builder.mutation({
      query: (data) => ({
        url: `/cart-item/`,
        method: "POST",
        body: data,
      }),
    }),

    getCartItem: builder.query({
      query: () => `cart-item`,
    }),

    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart-item/${id}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
    deleteCartItem: builder.mutation({
      query: ({ id }) => ({
        url: `cart-item/${id}`,
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",    
        body: orderData,
      }),
    }),
    GetOrder: builder.query({
      query: () => `order`,
    }),

    getCardInfo: builder.query({
      query: () => `card-info/user`,
    }),

    getMe: builder.query({
      query: () => `users/mee`,
    }),
    updateMe: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "PATCH",
        body: userData,
      }),
    }),
    DeleteCard: builder.mutation({
      query: ({ id }) => ({
        url: `card-info/${id}`,
        method: "DELETE", 
      }),
    }),

    addCard: builder.mutation({ 
      query: (orderData) => ({
        url: "/card-info",
        method: "POST",
        body: orderData,
      }),
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
  useGetCategoriesIdQuery,
  useGetProductsQuery,
  useGetProductIdQuery,
  useGetWishlistQuery,
  useToggleWishlistMutation,
  useDeleteWishlistMutation,
  useClearWishlistMutation,
  useGetCartItemQuery,
  useSearchProductsQuery,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useCreateOrderMutation,
  useGetCardInfoQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteCardMutation,
  useAddCardMutation,
  useRefreshTokenMutation,
  useGetOrderQuery,
} = api;

export default api;
