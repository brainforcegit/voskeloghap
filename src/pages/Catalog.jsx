import { useState } from "react";
import MapEmbed from "../components/MapEmbed.jsx";

export default function Catalog() {
    const products = JSON.parse(localStorage.getItem("vl_products") || "[]");
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 12px" }}>
            <h2>Каталог</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {products.map((p, i) => (
                    <div key={i} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                        {p.image && <img src={p.image} alt={p.name} style={{ maxWidth: "100%", borderRadius: "6px" }} />}
                        <h3>{p.name}</h3>
                        <p>{p.price} ֏</p>
                        <p>{p.available ? "✅ Доступно" : "❌ Нет в наличии"}</p>
                        {p.available && <button onClick={() => setShowModal(true)}>Reserve</button>}
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{
                        background: "#fff", padding: "20px", borderRadius: "8px",
                        textAlign: "center", maxWidth: "300px"
                    }}>
                        <h3>Бронирование</h3>
                        <p>Позвоните для брони:</p>
                        <a href="tel:+37477123456" style={{ fontSize: "18px", fontWeight: "bold" }}>+374 77 123 456</a>
                        <div style={{ marginTop: "12px" }}>
                            <button onClick={() => setShowModal(false)}>Закрыть</button>
                        </div>
                    </div>
                </div>
            )}
            <div id="about" style={{ margin: "24px auto" ,background: "#fff"}}>
                <div id="map" style={{ padding: "12px", background: "#f9f9f9" }}>    <MapEmbed/></div>
                <div id="about" style={{ minWidth:"450px",padding: "12px", background: "#f9f9f9" }}>
                    <p>Լողափը գտնվում է Սևան֊Գավառ ճանապարհին։ Գիշերակացի համար առաջարկում են քոթեջներ, որտեղ կան կոմունալ բոլոր հարմարությունները։
                        4-5 անձի համար նախատեսված քոթեջն ունի 2 ննջարան, հյուրասենյակ, սանհանգույց լոգարանով, սառնարան, հեռուստացույց, wi-fi։
                        Մինչև 8 անձի համար նախատեսված քոթեջներում առկա են 3 ննջարան, մեծ հյուրասենյակ` 2 բազմոցով, սանհանգույց լոգարանով, սառնարան հեռուստացույց, wi-fi։
                        Բոլոր քոթեջների հետ կարող են տրամադրել տաղավար։
                        Քոթեջները գտնվում են ափից մինչև 50մ հեռավորության վրա։ Ափին սպիտակ ավազ է։.</p>
                </div>
            </div>
        </div>
    );
}
