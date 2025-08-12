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
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminOnly><AdminDashboard/></AdminOnly>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <div id="map" style={{ marginTop: "40px" }}>
              <MapEmbed/>
            </div>

            <div id="about" style={{ padding: "20px", background: "#f9f9f9" }}>
                <h2>О нас</h2>
                <p>Voske Loxap — это золотой пляж в Цовазарде, где можно насладиться чистым озером и комфортом. Мы предлагаем аренду зонтов, лежаков и другие услуги для вашего отдыха.</p>
            </div>
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
