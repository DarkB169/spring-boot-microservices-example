import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

export default function EditNote() {
    const [note, setNote] = useState({ title: "", content: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/notes/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(res => setNote(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = e => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.put(`/notes/${id}`, note, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            navigate("/notes");
        } catch (e) {
            alert("Failed to update note");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Edit Note</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        className="form-control"
                        name="title"
                        value={note.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        name="content"
                        value={note.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="btn btn-success me-2">Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/notes")}>Cancel</button>
            </form>
        </div>
    );
}
