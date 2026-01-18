import {useGetUserByIdQuery} from "../store/apiSlice.js";
import {Link, useParams} from "react-router-dom";

export default function UserDetail() {
    const {userId} = useParams();
    const { data: selectedUser, isLoading, error } = useGetUserByIdQuery(userId, {
        skip: !userId
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
    if (error || !selectedUser) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">User Not Found</h4>
                    <p>{error || 'Unable to load user details'}</p>
                    <Link to="/users" className="btn btn-danger mt-3">
                        Back to Users
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="container py-5">
            <Link to="/users" className="btn btn-outline-secondary mb-4">
                ← Back to Users
            </Link>

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="card-title mb-4">User Profile</h2>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <p className="text-muted mb-1">User ID</p>
                                    <p className="h5">{selectedUser.id}</p>
                                </div>
                                <div className="col-md-6">
                                    <p className="text-muted mb-1">Username</p>
                                    <p className="h5">{selectedUser.username}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Email</p>
                                <p className="h5">{selectedUser.email}</p>
                            </div>
                            <div className="mb-3">
                                <p className="text-muted mb-1">Phone</p>
                                <p className="h5">{selectedUser.phone || 'N/A'}</p>
                            </div>
                            {selectedUser.address && (
                                <div className="mb-3">
                                    <p className="text-muted mb-1">Address</p>
                                    <p className="h5">
                                        {selectedUser.address.number} {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.zipcode}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Company</h5>
                            {selectedUser.company ? (
                                <>
                                    <p className="mb-2">
                                        <strong>{selectedUser.company.name}</strong>
                                    </p>
                                    <p className="text-muted small mb-2">
                                        {selectedUser.company.catchPhrase}
                                    </p>
                                </>
                            ) : (
                                <p className="text-muted">No company information</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
