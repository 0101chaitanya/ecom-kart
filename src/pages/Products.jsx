import {useDispatch} from "react-redux";
import React from "react";
import {Link} from "react-router-dom";
import {addToCart} from "../store/slices/cartSlice.js";
import {useGetProductsQuery} from "../store/apiSlice.js";

function Products() {
    const dispatch = useDispatch();
    const {data: products, isLoading, error} = useGetProductsQuery();

    if (isLoading) {
        return (<div className="container py-5 text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);
    }
    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Failed to load Products</h4>
                    <p>{error}</p>
                    <hr/>

                    <button className="btn btn-danger" onClick={() => window.location.reload()}>Retry</button>
                </div>
                <p className="text-muted mt-3">
                    <small>
                        If this error persists, please ensure that:
                        <ul>
                            <li>You have an active internet connection</li>
                            <li>fakestoreapi.com is accessible</li>
                            <li>Your browser allows cross-origin requests</li>
                        </ul>
                    </small>
                </p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">Products</h1>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div
                                style={{
                                    height: '250px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                    }}
                                    loading={"lazy"}
                                    onError={error => error.target.src = ""}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title" style={{minHeight: '50px'}}>
                                    {product.title}
                                </h5>
                                <p className="card-text text-muted text-truncate">
                                    {product.description}
                                </p>
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="h5 mb-0">${product.price}</span>
                                        <span className="badge bg-warning">
                                            ⭐ {product.rating.rate}
                                        </span>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="btn btn-outline-primary flex-grow-1"
                                        >
                                            View
                                        </Link>
                                        <button
                                            className="btn btn-danger"

                                            onClick={() => dispatch(addToCart(product))}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Products)
