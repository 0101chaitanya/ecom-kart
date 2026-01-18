import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearCart, removeFromCart, updateQuantity} from '../store/slices/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const {items, totalPrice, totalQuantity} = useSelector((state) => state.cart);

    if (items.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <h2 className="mb-4">Your Cart is Empty</h2>
                    <p className="text-muted mb-4">Start shopping to add items to your cart.</p>
                    <Link to="/products" className="btn btn-danger">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-5">Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {items.map((item) => (
                                <div key={item.id} className="row border-bottom pb-4 mb-4">
                                    <div className="col-md-2">
                                        <div
                                            style={{
                                                height: '120px',
                                                backgroundColor: '#f8f9fa',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>{item.title}</h5>
                                        <p className="text-muted text-truncate-2">{item.description}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <p className="text-muted mb-1">Price: ${item.price}</p>
                                            <p className="fw-bold mb-3">
                                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Quantity:</label>
                                            <div className="input-group" style={{width: '120px'}}>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() =>
                                                        dispatch(
                                                            updateQuantity({
                                                                id: item.id,
                                                                quantity: Math.max(1, item.quantity - 1),
                                                            })
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    className="form-control text-center"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() =>
                                                        dispatch(
                                                            updateQuantity({
                                                                id: item.id,
                                                                quantity: item.quantity + 1,
                                                            })
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => dispatch(removeFromCart({id: item.id}))}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm sticky-top" style={{top: '20px'}}>
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Items:</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 fw-bold">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-danger w-100 mb-2">
                                Proceed to Checkout
                            </button>
                            <button
                                className="btn btn-outline-danger w-100 mb-2"
                                onClick={() => dispatch(clearCart())}
                            >
                                Clear Cart
                            </button>
                            <Link to="/products" className="btn btn-outline-secondary w-100">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
