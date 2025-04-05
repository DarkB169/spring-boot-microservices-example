import React, { useState } from "react";
import API from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await API.post("/users/login", { email, password });
            login(res.data); // store token
            window.location.href = "/notes";
        } catch (e) {
            alert("Login failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h3 className="text-center mb-4">Login</h3>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" onClick={handleLogin}>
                        Login
                    </button>
                    <p className="text-center mt-3">
                        Don’t have an account? <a href="/register">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
