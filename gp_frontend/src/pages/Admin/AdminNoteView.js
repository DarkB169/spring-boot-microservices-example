import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";

export default function AdminNoteView() {
    const { id } = useParams();
    const [note, setNote] = useState(null);

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

    if (!note) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <h3>Note Details</h3>
            <p><strong>Title:</strong> {note.title}</p>
            <p><strong>Content:</strong> {note.content}</p>
            <p><strong>User ID:</strong> {note.userId}</p>
            <Link to="/admin/notes" className="btn btn-secondary">Back to List</Link>
        </div>
    );
}
