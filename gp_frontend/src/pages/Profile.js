import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.get("/users/me")
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Error loading user", err));
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>My Profile</h2>
            <div className="card p-4 mt-3">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <div className="mt-3">
                    <Link to="/profile/edit" className="btn btn-warning me-2">Edit Profile</Link>
                    <Link to="/profile/delete" className="btn btn-danger">Delete Account</Link>
                </div>
            </div>
        </div>
    );
}
