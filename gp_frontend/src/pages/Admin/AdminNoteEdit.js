import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function AdminNoteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: "",
        content: "",
        userId: ""
    });

    useEffect(() => {
        API
            .get(`/notes/admin/view/note/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
    .then((res) => setNote(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API
            .put(`/notes/admin/edit/note/${id}`, note, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
    .then(() => {
            alert("Note updated!");
            navigate("/admin/notes");
        })
            .catch((err) => {
                console.error(err);
                alert("Failed to update note.");
            });
    };

    return (
        <div className="container mt-4">
            <h3>Edit Note</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={note.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        name="content"
                        className="form-control"
                        value={note.content}
                        onChange={handleChange}
                        rows="8"
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/notes")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}