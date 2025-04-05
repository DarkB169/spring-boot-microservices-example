import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const NoteView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        API.get(`/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setNote(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch note.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container mt-4">Loading...</div>;
    if (error) return <div className="container mt-4 text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-3">{note.title}</h2>
            <p className="mb-4">{note.content}</p>
            <button className="btn btn-secondary me-2" onClick={() => navigate("/notes")}>
                Back to Notes
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/notes/edit/${id}`)}>
                Edit Note
            </button>
        </div>
    );
};

export default NoteView;
