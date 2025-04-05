import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import API from "../api/api";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/notes", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(res => setNotes(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await API.delete(`/notes/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNotes(notes.filter(note => note.id !== id));
        } catch (e) {
            console.error("Failed to delete note", e);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Your Notes</h2>
                <button type="button" className="btn btn-primary" onClick={() => navigate("/notes/create")}>
                    New Note
                </button>
            </div>

            <ul className="list-group">
                {notes.map(note => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={note.id}>
                        <Link to={`/notes/${note.id}`}>{note.title}</Link>
                        <div>
                            <Link className="btn btn-sm btn-outline-secondary me-2" to={`/notes/edit/${note.id}`}>Edit</Link>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}