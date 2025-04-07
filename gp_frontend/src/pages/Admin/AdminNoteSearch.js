import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function AdminNoteSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.get(`/notes/admin/search?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setResults(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to search notes. Try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Search Notes</h3>

            <form className="mb-4" onSubmit={handleSearch}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by keyword (title or content)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Search
                    </button>
                </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {results.length > 0 && (
                <>
                    <h5>Results:</h5>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>User ID</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(note => (
                            <tr key={note.id}>
                                <td>{note.title}</td>
                                <td>{note.content}</td>
                                <td>{note.userId}</td>
                                <td>
                                    <Link to={`/admin/notes/view/${note.id}`} className="btn btn-sm btn-info me-2">
                                        View
                                    </Link>
                                    <Link to={`/admin/notes/edit/${note.id}`} className="btn btn-sm btn-warning">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}