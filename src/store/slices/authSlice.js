/**
 * Authentication Redux Slice (RTK Query Integration)
 *
 * Manages user authentication state including:
 * - User login/logout
 * - JWT token storage and management
 * - Authentication status and error handling
 * - Persistent state via localStorage
 *
 * This slice works alongside RTK Query for API calls
 * and manages local authentication state.
 */

import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        // Restore authentication state from localStorage on app load
        user: localStorage.getItem("username") || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem("token"),
    },
    reducers: {
        /**
         * Login reducer
         * Sets authentication state after successful login
         */
        loginSuccess: (state, action) => {
            const { token, username } = action.payload;
            state.user = username;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
            state.loading = false;
            
            // Persist to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
        },
        
        /**
         * Logout reducer
         * Clears all auth state and removes stored credentials from localStorage
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
            
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        },
        
        /**
         * Set loading state
         * Used during login process
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        /**
         * Set error state
         * Used when login fails
         */
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        },
        
        /**
         * Clear error reducer
         * Clears any error messages from previous failed login attempts
         */
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {loginSuccess, logout, setLoading, setError, clearError} = authSlice.actions;
export default authSlice.reducer;
