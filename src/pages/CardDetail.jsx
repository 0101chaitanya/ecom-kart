import {Link, useParams} from 'react-router-dom';
import {useGetCartByIdQuery} from '../store/apiSlice.js';

function CartDetail() {
    const {cartId} = useParams();
    const { data: selectedCart, isLoading, error } = useGetCartByIdQuery(cartId, {
        skip: !cartId
    });

    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !selectedCart) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Cart Not Found</h4>
                    <p>{error || 'Unable to load cart details'}</p>
                    <Link to="/carts" className="btn btn-danger mt-3">
                        Back to Carts
                    </Link>
                </div>
            </div>
        );
    }

    const totalItems = selectedCart.products?.reduce(
        (sum, p) => sum + (p.quantity || 1),
        0
    ) || 0;

    return (
        <div className="container py-5">
            <Link to="/carts" className="btn btn-outline-secondary mb-4">
                ← Back to Carts
            </Link>

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">
                                Cart #{selectedCart.id}
                            </h2>
                            <div className="mb-4">
                                <p className="text-muted">User ID: {selectedCart.userId}</p>
                                <p className="text-muted">
                                    Total Items: <strong>{totalItems}</strong>
                                </p>
                            </div>

                            {selectedCart.products && selectedCart.products.length > 0 ? (
                                <div>
                                    <h5 className="mb-3">Products in Cart</h5>
                                    <div className="list-group">
                                        {selectedCart.products.map((product, index) => (
                                            <div
                                                key={index}
                                                className="list-group-item border-bottom py-3"
                                            >
                                                <div className="row align-items-center">
                                                    <div className="col-md-6">
                                                        <h6 className="mb-1">
                                                            Product ID: {product.productId}
                                                        </h6>
                                                        <small className="text-muted">
                                                            Quantity: {product.quantity || 1}
                                                        </small>
                                                    </div>
                                                    <div className="col-md-6 text-end">
                                                        <Link
                                                            to={`/products/${product.productId}`}
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            View Product
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-info" role="alert">
                                    This cart is empty
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Cart Summary</h5>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Cart ID</p>
                                <p className="h5">{selectedCart.id}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">User ID</p>
                                <p className="h5">
                                    <Link
                                        to={`/users/${selectedCart.userId}`}
                                        className="text-decoration-none"
                                    >
                                        User #{selectedCart.userId}
                                    </Link>
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Total Products</p>
                                <p className="h5">
                                    {selectedCart.products?.length || 0}
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Total Items</p>
                                <p className="h5">{totalItems}</p>
                            </div>
                            <hr/>
                            <Link to="/carts" className="btn btn-outline-danger w-100">
                                Back to All Carts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetail;
