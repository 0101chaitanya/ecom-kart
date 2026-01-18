import {useSelector} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';

function Dashboard() {
    const {isAuthenticated, user, token} = useSelector((state) => state.auth);
    const {totalQuantity, totalPrice} = useSelector((state) => state.cart);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Welcome, {user}! 👋</h2>
                            <div className="alert alert-info" role="alert">
                                <strong>Authentication Token:</strong>
                                <p className="mt-2 text-break" style={{fontSize: '0.85rem'}}>
                                    {token}
                                </p>
                            </div>
                            <p className="text-muted">
                                You are successfully logged in to Chaitanya Kart. You can now shop and manage your cart.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Quick Stats</h5>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Items in Cart</p>
                                <p className="h4 mb-0">{totalQuantity}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Cart Total</p>
                                <p className="h4 mb-0">${totalPrice.toFixed(2)}</p>
                            </div>
                            <hr/>
                            <Link to="/products" className="btn btn-danger w-100 mb-2">
                                Continue Shopping
                            </Link>
                            <Link to="/cart" className="btn btn-outline-danger w-100">
                                View Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Recent Activity</h5>
                            <p className="text-muted mb-0">
                                Login time: {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
