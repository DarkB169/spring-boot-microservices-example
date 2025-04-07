import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await API.get("/notes", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            fetchNotes();
            return;
        }

        try {
            const res = await API.get(`/notes/search?query=${query}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setNotes(res.data);
        } catch (err) {
            console.error("Search failed", err);
        }
    };

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

            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search notes by keyword..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-secondary">
                        Search
                    </button>
                </div>
            </form>

            {notes.length === 0 ? (
                <p>No notes found.</p>
            ) : (
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
            )}
        </div>
    );
}
