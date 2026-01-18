/**
 * Home Page Component (pages/Home.jsx)
 *
 * Landing page of the e-commerce application
 * Displays:
 * - Welcome banner with call-to-action buttons
 * - Feature highlights (products, users, login)
 * - Navigation links to key sections
 *
 * Navigation:
 * - "Start Shopping" → /products
 * - "View All Features" → /features
 */

import {Link} from 'react-router-dom';

/**
 * Home Component
 * Renders the landing page with product and feature overview
 */
function Home() {
    return (
        <>
            {/* Welcome Banner */}
            <div className="container-fluid bg-light py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">Welcome to Chaitanya Kart</h1>
                    <p className="lead mb-5">
                        Full-featured e-commerce platform powered by FakeStoreAPI
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/products" className="btn btn-danger btn-lg">
                            Start Shopping
                        </Link>
                        <Link to="/features" className="btn btn-outline-danger btn-lg">
                            View All Features
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Highlights Section */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Feature 1: Products */}
                    <div className="col-md-4 text-center">
                        <div className="mb-3">
                            <h2>🛍️</h2>
                        </div>
                        <h5>20+ Products</h5>
                        <p className="text-muted">
                            Browse through a diverse selection of products with detailed information
                        </p>
                    </div>

                    {/* Feature 2: User Management */}
                    <div className="col-md-4 text-center">
                        <div className="mb-3">
                            <h2>👥</h2>
                        </div>
                        <h5>User Management</h5>
                        <p className="text-muted">
                            Explore user profiles and view their shopping carts
                        </p>
                    </div>

                    {/* Feature 3: Security */}
                    <div className="col-md-4 text-center">
                        <div className="mb-3">
                            <h2>🔐</h2>
                        </div>
                        <h5>Secure Login</h5>
                        <p className="text-muted">
                            JWT authentication with secure user sessions
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
