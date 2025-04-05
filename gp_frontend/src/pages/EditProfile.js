import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        newPassword: "",
        currentPassword: "",
    });
    const [error, setError] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        newPassword: false,
        currentPassword: false,
    });

    const BASE_URL = "http://localhost:8080";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUserData((prev) => ({
                    ...prev,
                    username: res.data.username,
                    email: res.data.email,
                }));
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user data");
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleToggle = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const payload = {
            username: userData.username,
            email: userData.email,
        };

        if (userData.newPassword) {
            if (!userData.currentPassword) {
                setError("Please provide your current password to change the password.");
                return;
            }
            payload.currentPassword = userData.currentPassword;
            payload.newPassword = userData.newPassword;
        }

        try {
            const res = await axios.put(`${BASE_URL}/users/me`, payload, config);

            if (userData.newPassword ||  userData.email) {
                alert("Password updated. You need to log in again.");
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("Update failed. Please check your credentials.");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Edit Profile</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>New Password</label>
                    <div className="input-group">
                        <input
                            name="newPassword"
                            type={showPasswords.newPassword ? "text" : "password"}
                            value={userData.newPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Leave blank to keep old"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleToggle("newPassword")}
                        >
                            {showPasswords.newPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {userData.newPassword && (
                    <div className="mb-3">
                        <label>Current Password</label>
                        <div className="input-group">
                            <input
                                name="currentPassword"
                                type={showPasswords.currentPassword ? "text" : "password"}
                                value={userData.currentPassword}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => handleToggle("currentPassword")}
                            >
                                {showPasswords.currentPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/profile")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
