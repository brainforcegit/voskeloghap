import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hvrdepbwbrtuqirjfqrc.supabase.co"; // замени на свой
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cmRlcGJ3YnJ0dXFpcmpmcXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNDg0ODgsImV4cCI6MjA3MDYyNDQ4OH0.9jGx5VBMezMZxWqwr4pfj7A5x6M2i6SkQ6aSM1-VM54"; // замени на свой

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboard() {
    const nav = useNavigate();

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);
    const [image, setImage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("vl_admin_token");
        if (!token) nav("/signin");
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
        if (error) {
            alert("Ошибка загрузки продуктов: " + error.message);
            return;
        }
        setProducts(data);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // base64
        };
        reader.readAsDataURL(file);
    };

    async function addProduct() {
        if (!name || !price) return alert("Введите название и цену");

        const { data, error } = await supabase.from("products").insert([
            { name, price, available, image },
        ]);

        if (error) {
            alert("Ошибка добавления: " + error.message);
            return;
        }

        setName("");
        setPrice("");
        setAvailable(true);
        setImage("");
        fetchProducts();
    }

    async function deleteProduct(id) {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) {
            alert("Ошибка удаления: " + error.message);
            return;
        }
        fetchProducts();
    }

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "24px auto",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <h2>Админ-панель</h2>
            <input
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                />
                Доступно
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {image && (
                <div>
                    <img
                        src={image}
                        alt="preview"
                        style={{ maxWidth: "100px", marginTop: "8px" }}
                    />
                </div>
            )}

            <button onClick={addProduct}>Добавить товар</button>

            <hr />
            <h3>Список товаров</h3>
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "26px",
                    flexWrap: "wrap",
                }}
            >
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{ borderBottom: "1px solid #ccc", marginBottom: "8px" }}
                    >
                        {p.image && (
                            <img src={p.image} alt={p.name} style={{ maxWidth: "80px" }} />
                        )}
                        <div>
                            {p.name} — {p.price} ֏ {p.available ? "✅" : "❌"}
                        </div>
                        <button onClick={() => deleteProduct(p.id)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
