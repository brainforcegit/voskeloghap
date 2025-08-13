import { useState, useEffect } from "react";
import MapEmbed from "../components/MapEmbed.jsx";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvrdepbwbrtuqirjfqrc.supabase.co"; // замени на свой
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cmRlcGJ3YnJ0dXFpcmpmcXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNDg0ODgsImV4cCI6MjA3MDYyNDQ4OH0.9jGx5VBMezMZxWqwr4pfj7A5x6M2i6SkQ6aSM1-VM54"; // замени на свой
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Ошибка загрузки продуктов:", error.message);
            return;
        }
        setProducts(data);
    }

    return (
        <div style={{ maxWidth: "960px", margin: "24px auto", padding: "0 12px" }}>
            {products?.length ? <h2>Каталог</h2> : <></>}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                }}
            >
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "12px",
                            textAlign: "center",
                        }}
                    >
                        {p.image && (
                            <img
                                src={p.image}
                                alt={p.name}
                                style={{ maxWidth: "100%", borderRadius: "6px" }}
                            />
                        )}
                        <h3>{p.name}</h3>
                        <p>{p.price} ֏</p>
                        <p>{p.available ? "✅ Доступно" : "❌ Нет в наличии"}</p>
                        {p.available && (
                            <button onClick={() => setShowModal(true)}>Reserve</button>
                        )}
                    </div>
                ))}
            </div>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            textAlign: "center",
                            maxWidth: "300px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Бронирование</h3>
                        <p>Позвоните для брони:</p>
                        <a
                            href="tel:+37477123456"
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            +374 77 123 456
                        </a>
                        <div style={{ marginTop: "12px" }}>
                            <button onClick={() => setShowModal(false)}>Закрыть</button>
                        </div>
                    </div>
                </div>
            )}

            <div
                id="about"
                style={{ margin: "24px auto", background: "#fff", display: "flex", gap: "12px" }}
            >
                <div id="map" style={{ padding: "12px", background: "#f9f9f9", flex: 1 }}>
                    <MapEmbed />
                </div>
                <div
                    id="about-text"
                    style={{ minWidth: "450px", padding: "12px", background: "#f9f9f9", flex: 1 }}
                >
                    <p>
                        Լողափը գտնվում է Սևան֊Գավառ ճանապարհին։ Գիշերակացի համար առաջարկում
                        են քոթեջներ, որտեղ կան կոմունալ բոլոր հարմարությունները։ 4-5 անձի համար
                        նախատեսված քոթեջն ունի 2 ննջարան, հյուրասենյակ, սանհանգույց լոգարանով,
                        սառնարան, հեռուստացույց, wi-fi։ Մինչև 8 անձի համար նախատեսված
                        քոթեջներում առկա են 3 ննջարան, մեծ հյուրասենյակ` 2 բազմոցով,
                        սանհանգույց լոգարանով, սառնարան հեռուստացույց, wi-fi։ Բոլոր
                        քոթեջների հետ կարող են տրամադրել տաղավար։ Քոթեջները գտնվում են
                        ափից մինչև 50մ հեռավորության վրա։ Ափին սպիտակ ավազ է։.
                    </p>
                </div>
            </div>
        </div>
    );
}