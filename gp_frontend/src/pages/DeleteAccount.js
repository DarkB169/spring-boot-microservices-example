import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function DeleteAccount() {
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("Are you sure?")) {
            API.delete("/users/me")
                .then(() => {
                    localStorage.removeItem("token");
                    navigate("/register");
                })
                .catch(() => alert("Failed to delete account"));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Delete Account</h2>
            <p className="text-danger">This action is irreversible.</p>
            <div className="d-flex">
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Account
                </button>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/profile")}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
