import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const location = useLocation();
    const hideNavbarOn = ["/login", "/register"];

    const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <Navbar />}
            <main className="container mt-4">{children}</main>
        </>
    );
}
