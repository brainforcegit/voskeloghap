import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Catalog from "./pages/Catalog.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Header from "./components/Header.jsx";
import MapEmbed from "./components/MapEmbed.jsx";

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/admin" element={<AdminOnly><AdminDashboard/></AdminOnly>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

</>
    );
}

function AdminOnly({ children }) {
    const token = localStorage.getItem("vl_admin_token");
    const navigate = useNavigate();
    if (!token) {
        navigate("/admin");
        return null;
    }
    return children;
}
