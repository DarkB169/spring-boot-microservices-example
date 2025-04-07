import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";

export default function AdminNotesViewByUser() {
    const { userId } = useParams();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/notes/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => setNotes(res.data))
            .catch((err) => console.error("Failed to fetch notes:", err))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <h3>Notes by User ID: {userId}</h3>

            {notes.length === 0 ? (
                <p>No notes found for this user.</p>
            ) : (
                <ul className="list-group">
                    {notes.map((note) => (
                        <li className="list-group-item" key={note.id}>
                            <h5>{note.title}</h5>
                            <p>{note.content}</p>
                            <small className="text-muted">Note ID: {note.id}</small>
                        </li>
                    ))}
                </ul>
            )}

            <Link to="/admin/users" className="btn btn-secondary mt-3">Back to Users List</Link>
        </div>
    );
}
