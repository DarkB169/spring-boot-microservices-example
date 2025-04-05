import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminUserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", email: "" });

    useEffect(() => {
        axios.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/users/${id}`, user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(() => navigate("/admin/users"))
            .catch(err => alert("Failed to update user."));
    };

    return (
        <div className="container mt-4">
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control"
                           value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control"
                           value={user.username} onChange={handleChange} required />
                </div>
                <div className="d-flex">
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate("/admin/users")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminUserEdit;
