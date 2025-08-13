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
            <Link to={'/'}><h1>Ոսկյա լողափ</h1></Link>
            <nav style={{ display: "flex", gap: "16px" }}>
                <Link to="/">Կատալոգ</Link>
                <a href="#map">Քարտեզ</a>
                <a href="#about">Մեր մասին </a>
            </nav>
        </header>
    );
}
