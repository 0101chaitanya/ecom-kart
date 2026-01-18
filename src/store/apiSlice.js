/**
 * RTK Query API Slice
 *
 * Replaces all manual fetch requests with RTK Query for:
 * - Automatic caching
 * - Background refetching
 * - Loading/error state management
 * - Optimistic updates
 */

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// In development, use the proxy path '/api' which will be rewritten by Vite
// In production, use the direct API URL
const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://fakestoreapi.com";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        // Add error handling for development
        fetchFn: async (input, init) => {
            try {
                const response = await fetch(input, init);
                if (!response.ok) {
                    const error = new Error('An error occurred while fetching the data.');
                    error.status = response.status;
                    throw error;
                }
                return response;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        },
    }),
    tagTypes: ['Product', 'User', 'Cart', 'Category'],
    endpoints: (builder) => ({

        // ============= PRODUCTS ENDPOINTS =============

        getProducts: builder.query({
            query: () => 'products',
            providesTags: ['Product'],
            // Cache for 5 minutes
            keepUnusedDataFor: 300,
        }),

        getProductById: builder.query({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{type: 'Product', id}],
            keepUnusedDataFor: 300,
        }),

        getCategories: builder.query({
            query: () => 'products/categories',
            providesTags: ['Category'],
            keepUnusedDataFor: 600, // Categories change less often
        }),

        getProductsByCategory: builder.query({
            query: (category) => `products/category/${category}`,
            providesTags: ['Product'],
            keepUnusedDataFor: 300,
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: 'products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation({
            query: ({id, ...product}) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Product', id}],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),

        // ============= USERS ENDPOINTS =============

        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['User'],
            keepUnusedDataFor: 300,
        }),

        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{type: 'User', id}],
            keepUnusedDataFor: 300,
        }),

        createUser: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),

        updateUser: builder.mutation({
            query: ({id, ...user}) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'User', id}],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        // ============= CARTS ENDPOINTS =============

        getCarts: builder.query({
            query: () => 'carts',
            providesTags: ['Cart'],
            keepUnusedDataFor: 60, // Carts change frequently
        }),

        getCartById: builder.query({
            query: (id) => `carts/${id}`,
            providesTags: (result, error, id) => [{type: 'Cart', id}],
            keepUnusedDataFor: 60,
        }),

        getUserCarts: builder.query({
            query: (userId) => `carts/user/${userId}`,
            providesTags: ['Cart'],
            keepUnusedDataFor: 60,
        }),

        createCart: builder.mutation({
            query: (cart) => ({
                url: 'carts',
                method: 'POST',
                body: cart,
            }),
            invalidatesTags: ['Cart'],
        }),

        updateCart: builder.mutation({
            query: ({id, ...cart}) => ({
                url: `carts/${id}`,
                method: 'PUT',
                body: cart,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Cart', id}],
        }),

        deleteCart: builder.mutation({
            query: (id) => ({
                url: `carts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        // ============= AUTHENTICATION ENDPOINTS =============

        login: builder.mutation({
            query: ({username, password}) => ({
                url: 'auth/login',
                method: 'POST',
                body: {username, password},
            }),
        }),
    }),
});

// Export auto-generated hooks
export const {
    // Product hooks
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

    // User hooks
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,

    // Cart hooks
    useGetCartsQuery,
    useGetCartByIdQuery,
    useGetUserCartsQuery,
    useCreateCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,

    // Auth hookss
    useLoginMutation
} = api;
