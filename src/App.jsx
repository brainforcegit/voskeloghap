import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Catalog from "./pages/Catalog.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Header from "./components/Header.jsx";

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/signin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

</>
    );
}
