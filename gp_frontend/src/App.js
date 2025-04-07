import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAdmin from "./components/RequireAdmin";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import DeleteAccount from "./pages/DeleteAccount";

import NotesList from "./pages/NotesList";
import NoteView from "./pages/NoteView";
import NoteCreate from "./pages/NoteCreate";
import NoteEdit from "./pages/NoteEdit";

import AdminUserList from "./pages/Admin/AdminUserList";
import AdminUserView from "./pages/Admin/AdminUserView";
import AdminUserEdit from "./pages/Admin/AdminUserEdit";

import AdminNoteList from "./pages/Admin/AdminNoteList";
import AdminNoteEdit from "./pages/Admin/AdminNoteEdit";
import AdminNoteView from "./pages/Admin/AdminNoteView";
import AdminNotesViewByUser from "./pages/Admin/AdminNotesViewByUser";
import AdminNoteSearch from "./pages/Admin/AdminNoteSearch";

function App() {
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <Layout>
                        <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/edit" element={<EditProfile />} />
                            <Route path="/profile/delete" element={<DeleteAccount />} />

                            <Route path="/notes" element={<NotesList />} />
                            <Route path="/notes/:id" element={<NoteView />} />
                            <Route path="/notes/create" element={<NoteCreate />} />
                            <Route path="/notes/edit/:id" element={<NoteEdit />} />

                            <Route
                                path="/admin/users"
                                element={
                                    <RequireAdmin>
                                        <AdminUserList />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/users/view/:id"
                                element={
                                    <RequireAdmin>
                                        <AdminUserView />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/users/edit/:id"
                                element={
                                    <RequireAdmin>
                                        <AdminUserEdit />
                                    </RequireAdmin>
                                }
                            />

                            {/* Admin-only routes (Notes) */}
                            <Route
                                path="/admin/notes"
                                element={
                                    <RequireAdmin>
                                        <AdminNoteList />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/notes/edit/:id"
                                element={
                                    <RequireAdmin>
                                        <AdminNoteEdit />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/notes/view/:id"
                                element={
                                    <RequireAdmin>
                                        <AdminNoteView />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/notes/view/user/:userId"
                                element={
                                    <RequireAdmin>
                                        <AdminNotesViewByUser />
                                    </RequireAdmin>
                                }
                            />
                            <Route
                                path="/admin/notes/search"
                                element={
                                    <RequireAdmin>
                                        <AdminNoteSearch />
                                    </RequireAdmin>
                                }
                            />

                        </Routes>
                    </Layout>
                }
            />

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}



export default App;