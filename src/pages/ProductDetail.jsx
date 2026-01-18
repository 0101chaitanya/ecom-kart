import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../store/apiSlice";
import {addToCart} from "../store/slices/cartSlice";

export default function ProductDetail() {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const {data: selectedProduct, isLoading: loading, error} = useGetProductByIdQuery(productId, {
        skip: !productId, // Skip the query if productId is not available
    });
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if (error || !selectedProduct) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Product Not Found</h4>
                    <p>{error || 'Unable to load product details'}</p>
                    <Link to="/products" className="btn btn-danger mt-3">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="container py-5">
            <Link to="/products" className="btn btn-outline-secondary mb-4">
                ← Back to Products
            </Link>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div
                        style={{
                            minHeight: '400px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                        }}
                    >
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            style={{
                                maxHeight: '400px',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <h1 className="mb-3">{selectedProduct.title}</h1>

                    <div className="mb-4">
                        <span className="badge bg-secondary me-2">
                            {selectedProduct.category}
                        </span>
                        <span className="badge bg-warning">
                            ⭐ {selectedProduct.rating?.rate || 'N/A'} ({selectedProduct.rating?.count || 0} reviews)
                        </span>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-danger">${selectedProduct.price}</h3>
                    </div>

                    <div className="mb-4">
                        <h5>Description</h5>
                        <p className="text-muted">{selectedProduct.description}</p>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-danger btn-lg flex-grow-1"
                            onClick={() => dispatch(addToCart(selectedProduct))}
                        >
                            Add to Cart
                        </button>
                        <button className="btn btn-outline-danger btn-lg">
                            ❤️ Wishlist
                        </button>
                    </div>

                    <div className="alert alert-info mt-4" role="alert">
                        <small>In stock and ready to ship!</small>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <h3 className="mb-4">Product Information</h3>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td className="fw-bold">Product ID</td>
                            <td>{selectedProduct.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Category</td>
                            <td>{selectedProduct.category}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Price</td>
                            <td>${selectedProduct.price}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Rating</td>
                            <td>
                                {selectedProduct.rating?.rate || 'N/A'} stars
                                                                        ({selectedProduct.rating?.count || 0} reviews)
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
