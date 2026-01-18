/**
 * Login Page Component
 *
 * Provides user authentication interface with:
 * - Username and password input fields
 * - Form submission with Redux dispatch
 * - Error message display
 * - Loading state feedback
 * - Auto-redirect if already authenticated
 * - Demo credentials display for testing
 *
 * On successful login, dispatches loginUser action which:
 * 1. Calls API with credentials
 * 2. Receives JWT token
 * 3. Stores token in localStorage
 * 4. Updates Redux auth state
 * 5. Redirects to dashboard
 */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {clearError, loginSuccess, setError, setLoading} from '../store/slices/authSlice';
import {useLoginMutation} from '../store/apiSlice.js';

/**
 * Login Component
 * Renders the login form and handles user authentication
 */
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get auth state from Redux store
    const {error: authError, isAuthenticated} = useSelector((state) => state.auth);
    const [login, {isLoading, error: loginError}] = useLoginMutation();
    
    // Combine errors from both auth slice and login mutation
    const error = authError || loginError;

    // Local form state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Redirect if already authenticated - prevents accessing login when already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    /**
     * Handle form submission
     * Validates credentials and dispatches login action
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear any previous error messages
        dispatch(clearError());

        try {
            const result = await login({ username, password }).unwrap();
            // Dispatch login success action to update auth state
            dispatch(loginSuccess({
                token: result.token,
                username: username
            }));
            // No need to navigate here as the useEffect will handle the redirect
        } catch (error) {
            // Handle the error from the mutation
            dispatch(setError(error.data?.message || 'Login failed'));
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <h2 className="card-title text-center mb-4">Login</h2>

                            {/* Display error message if login failed */}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Login Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Submit Button - disabled during loading */}
                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            {/* Demo Credentials Section for Testing */}
                            <div className="mt-4 text-center text-muted">
                                <p className="fw-bold mb-2">Demo Credentials:</p>
                                <small>username: mor_2314</small>
                                <br/>
                                <small>password: 83r5^_</small>
                                <hr className="my-3"/>
                                <p className="fw-bold mb-2">Other Valid Users:</p>
                                <small>johnd / m38rmF$</small>
                                <br/>
                                <small>kevinryan / kev02937@</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
