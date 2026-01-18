import {Link} from 'react-router-dom';
import {useGetCartsQuery} from '../store/apiSlice.js';

function Carts() {
    const { data: carts, isLoading, error } = useGetCartsQuery();

    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Failed to Load Carts</h4>
                    <p>{error}</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">All Shopping Carts ({carts.length})</h1>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>Cart ID</th>
                        <th>User ID</th>
                        <th>Products</th>
                        <th>Total Items</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carts.map((cart) => {
                        const totalItems = cart.products?.reduce(
                            (sum, p) => sum + (p.quantity || 1),
                            0
                        ) || 0;

                        return (
                            <tr key={cart.id}>
                                <td>
                                        <span className="badge bg-primary">
                                            {cart.id}
                                        </span>
                                </td>
                                <td>
                                    <Link
                                        to={`/users/${cart.userId}`}
                                        className="text-decoration-none"
                                    >
                                        User #{cart.userId}
                                    </Link>
                                </td>
                                <td>
                                    {cart.products && cart.products.length > 0 ? (
                                        <span className="badge bg-success">
                                                {cart.products.length} products
                                            </span>
                                    ) : (
                                        <span className="text-muted">Empty</span>
                                    )}
                                </td>
                                <td>{totalItems}</td>
                                <td>
                                    <Link
                                        to={`/carts/${cart.id}`}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Carts;
