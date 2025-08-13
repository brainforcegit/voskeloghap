import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={{
            background: "#ffcc00",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Link to={'/'}><h1>Voske Loxap</h1></Link>
            <nav style={{ display: "flex", gap: "16px" }}>
                <Link to="/">Каталог</Link>
                <a href="#map">Карта</a>
                <a href="#about">О нас</a>
            </nav>
        </header>
    );
}
