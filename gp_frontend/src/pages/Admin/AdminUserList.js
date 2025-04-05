import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminUserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h3>User Management</h3>
            <table className="table table-striped mt-3">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/admin/users/view/${user.id}`} className="btn btn-sm btn-info me-2">View</Link>
                            <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        axios
            .delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                setUsers(users.filter((u) => u.id !== id));
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete user.");
            });
    }
};

export default AdminUserList;
