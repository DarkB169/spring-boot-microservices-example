import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";

const AdminUserView = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!user) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <h3>User Info</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Link to="/admin/users" className="btn btn-secondary mt-3">Back</Link>
        </div>
    );
};

export default AdminUserView;
