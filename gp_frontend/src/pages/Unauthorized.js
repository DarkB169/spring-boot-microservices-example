import React from "react";

export default function Unauthorized() {
    return (
        <div className="container mt-5 text-center">
            <h3 className="text-danger">403 - Unauthorized</h3>
            <p>You do not have permission to access this page.</p>
        </div>
    );
}
