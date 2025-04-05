import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
}
