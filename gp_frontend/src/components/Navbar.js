import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "../pages/Logout";

function Navbar() {
    const navigate = useNavigate();
    const { logout } = Logout;

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
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={logout => navigate("/")}>
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
