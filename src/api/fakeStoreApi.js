/**
 * Minimal API functions for components that still need them
 * Most API calls have been migrated to RTK Query
 */

// Use proxy in development (/api), direct URL in production
const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://fakestoreapi.com";

/**
 * Login user with username and password
 * @async
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise<Object>} Response object containing JWT token
 * @throws {Error} If credentials are invalid or API request fails
 */
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            mode: "cors",
            body: JSON.stringify({username, password}),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `Login failed: ${errorData.message || response.statusText}`
            );
        }
        const data = await response.json();
        if (!data.token) {
            throw new Error("No token received from server");
        }
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
