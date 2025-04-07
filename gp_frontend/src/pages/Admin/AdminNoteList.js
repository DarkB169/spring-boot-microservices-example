import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function AdminNoteList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        API
            .get("/notes/admin", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => setNotes(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this note?");
        if (!confirmed) return;

        API
            .delete(`/notes/admin/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(() => {
                setNotes((prev) => prev.filter((note) => note.id !== id));
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete note");
            });
    };


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>All Notes</h3>
                <Link to="/admin/users" className="btn btn-outline-primary">Go to User Management</Link>
                <Link to="/admin/notes/search" className="btn btn-outline-secondary ms-2">Search Notes</Link>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>User ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {notes.map((note) => (
                    <tr key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.userId}</td>
                        <td>
                            <Link to={`/admin/notes/view/${note.id}`} className="btn btn-info btn-sm me-2">
                                View
                            </Link>
                            <Link to={`/admin/notes/edit/${note.id}`} className="btn btn-warning btn-sm me-2">
                                Edit
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(note.id)}
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
}
