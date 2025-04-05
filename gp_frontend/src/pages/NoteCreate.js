import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function NewNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/notes", { title, content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            navigate("/notes");
        } catch (e) {
            alert("Failed to create note");
        }
    };

    return (
        <div className="container mt-5">
            <h3>New Note</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} required />
                </div>
                <button className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/notes")}>Cancel</button>
            </form>
        </div>
    );
}
