import React from 'react';
import {Link} from 'react-router-dom';
import {useGetUsersQuery} from '../store/apiSlice.js';

function Users() {
    const {data: users, isLoading, error} = useGetUsersQuery();

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
                    <h4 className="alert-heading">Failed to Load Users</h4>
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
            <h1 className="mb-5">Users ({users.length})</h1>
            <div className="row g-4">
                {users.map(({address, email, id, phone, username}
                ) => (
                    <div key={id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span className="badge bg-primary me-2">{id}</span>
                                    {username}
                                </h5>
                                <p className="card-text text-muted">
                                    <small>{email}</small>
                                </p>
                                <p className="card-text mb-3">
                                    <small className="text-muted">{phone}</small>
                                </p>
                                {address && (
                                    <p className="card-text mb-3">
                                        <small className="text-muted">
                                            📍 {address.city}
                                        </small>
                                    </p>
                                )}
                                <Link
                                    to={`/users/${id}`}
                                    className="btn btn-danger w-100"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default React.memo(Users);
