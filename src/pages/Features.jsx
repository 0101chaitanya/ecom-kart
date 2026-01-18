import {Link} from 'react-router-dom';

function Features() {
    const features = [
        {
            title: 'Products',
            icon: '🛍️',
            description: 'Browse and filter through 20+ products with detailed information',
            link: '/products',
            items: [
                'View all products',
                'Product details page',
                'Filter by category',
                'Rating and reviews',
                'Add to cart'
            ]
        },
        {
            title: 'Users',
            icon: '👥',
            description: 'Manage and view user profiles with complete information',
            link: '/users',
            items: [
                'View all users',
                'User profiles',
                'Contact information',
                'Company details',
                'Address information'
            ]
        },
        {
            title: 'Shopping Carts',
            icon: '🛒',
            description: 'View and manage shopping carts from users',
            link: '/carts',
            items: [
                'View all carts',
                'Cart details',
                'Products in cart',
                'Quantity tracking',
                'Link to user profiles'
            ]
        },
        {
            title: 'Authentication',
            icon: '🔐',
            description: 'Secure login with JWT token authentication',
            link: '/login',
            items: [
                'User login',
                'JWT token generation',
                'User dashboard',
                'Session management',
                'Logout functionality'
            ]
        },
        {
            title: 'Personal Cart',
            icon: '🛒',
            description: 'Add/remove products and manage your shopping cart',
            link: '/cart',
            items: [
                'Add products to cart',
                'Update quantities',
                'Remove items',
                'Cart summary',
                'Order total'
            ]
        },
        {
            title: 'Dashboard',
            icon: '📊',
            description: 'View user dashboard with cart statistics',
            link: '/dashboard',
            items: [
                'User welcome',
                'Cart statistics',
                'Order summary',
                'Authentication token',
                'Quick actions'
            ]
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">All Features</h1>
                <p className="lead text-muted">
                    Comprehensive e-commerce platform with full FakeStoreAPI integration
                </p>
            </div>

            <div className="row g-4">
                {features.map((feature, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h2 className="mb-2">{feature.icon}</h2>
                                <h5 className="card-title mb-2">{feature.title}</h5>
                                <p className="card-text text-muted mb-3">
                                    {feature.description}
                                </p>
                                <ul className="list-unstyled mb-4">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="mb-2">
                                            <small>✓ {item}</small>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to={feature.link}
                                    className="btn btn-danger w-100"
                                >
                                    Explore {feature.title}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 p-4 bg-light rounded">
                <h3 className="mb-3">API Endpoints Implemented</h3>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Products</h6>
                        <ul className="small text-muted">
                            <li>GET /products</li>
                            <li>GET /products/:id</li>
                            <li>GET /products/categories</li>
                            <li>GET /products/category/:category</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h6>Users & Carts</h6>
                        <ul className="small text-muted">
                            <li>GET /users</li>
                            <li>GET /users/:id</li>
                            <li>GET /carts</li>
                            <li>GET /carts/:id</li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <h6>Authentication</h6>
                        <ul className="small text-muted">
                            <li>POST /auth/login</li>
                            <li>JWT Token Storage</li>
                            <li>User Session Management</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h6>Local Features</h6>
                        <ul className="small text-muted">
                            <li>Redux State Management</li>
                            <li>LocalStorage Persistence</li>
                            <li>Shopping Cart Logic</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;
