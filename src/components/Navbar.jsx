/**
 * Navbar Component (components/Navbar.jsx)
 *
 * Main navigation bar appearing on all pages
 * Features:
 * - Sticky positioning (stays at top while scrolling)
 * - Responsive design (collapses on mobile)
 * - Shopping cart item count badge
 * - Authentication status indicator
 * - Dropdown menu for browsing users and carts
 *
 * Navigation Links:
 * - Home: /
 * - Features: /features
 * - Products: /products
 * - Browse Dropdown:
 *   - Users: /users
 *   - All Carts: /carts
 * - Shopping Cart: /cart (with item count badge)
 * - Login/Logout: /login (conditional based on auth)
 *
 * Responsive Behavior:
 * - Expands on desktop (navbar-expand-lg)
 * - Collapses into hamburger menu on mobile
 */

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store/slices/authSlice';
import './Navbar.css';

/**
 * Navbar Component
 * Provides navigation and authentication UI
 */
function Navbar() {
    const dispatch = useDispatch();

    // Get cart items count and auth state from Redux
    // const cartItems = useSelector((state) => state.cart.totalQuantity);
    const {isAuthenticated, user, cartItems} = useSelector((state) => ({
        cartItems: state.cart.totalQuantity,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }), shallowEqual);

    /**
     * Handle logout action
     * Clears auth state and redirects to home
     */
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                {/* Brand/Logo */}
                <Link className="navbar-brand" to="/">
                    <span className="fw-bold">Chaitanya Kart</span>
                </Link>

                {/* Mobile toggle button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar content */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Features Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/features">
                                Features
                            </Link>
                        </li>

                        {/* Products Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        {/* Browse Dropdown */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Browse
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/users">
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/carts">
                                        All Carts
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Shopping Cart with Badge */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart <span className="badge bg-danger">{cartItems}</span>
                            </Link>
                        </li>

                        {/* Authentication Section */}
                        {isAuthenticated ? (
                            <>
                                {/* Welcome Message */}
                                <li className="nav-item">
                                    <span className="nav-link">
                                        Welcome, <strong>{user}</strong>
                                    </span>
                                </li>

                                {/* Logout Button */}
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            /* Login Link */
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
