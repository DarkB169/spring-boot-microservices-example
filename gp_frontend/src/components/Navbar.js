import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let role = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role || decoded.roles || null;
        } catch (err) {
            console.error("Invalid token", err);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">MyApp</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/notes" className="nav-link">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        {role === "ADMIN" && (
                            <li className="nav-item">
                                <Link to="/admin/users" className="nav-link">Admin Panel</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => navigate("/")}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
