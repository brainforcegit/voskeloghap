import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminDashboard() {
    const nav = useNavigate();


    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("vl_products") || "[]")
    );
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);
    const [image, setImage] = useState("");


    useEffect(() => {
        const token =  localStorage.getItem("vl_admin_token");
        redirect(token)
    }, []);

    const saveProducts = (newProducts) => {
        setProducts(newProducts);
        localStorage.setItem("vl_products", JSON.stringify(newProducts));
    };
    function redirect(token) {

        if (!token) {
            nav("/signin");
        }
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

    const addProduct = () => {
        if (!name || !price) return alert("Введите название и цену");
        const newProduct = { name, price, available, image };
        saveProducts([...products, newProduct]);
        setName("");
        setPrice("");
        setAvailable(true);
        setImage("");
    };

    const deleteProduct = (index) => {
        const updated = products.filter((_, i) => i !== index);
        saveProducts(updated);
    };

    return (
        <div style={{ maxWidth: 600, margin: "24px auto" ,display: "flex" ,justifyContent: "center" ,flexDirection: "column" }}>
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
                    <img src={image} alt="preview" style={{ maxWidth: "100px", marginTop: "8px" }} />
                </div>
            )}

            <button onClick={addProduct}>Добавить товар</button>

            <hr />
            <h3>Список товаров</h3>
            <div style={{ display: "flex", justifyContent: "start", alignItems: "center",gap: "26px" }}>
            {products.map((p, i) => (
                <div key={i} style={{ borderBottom: "1px solid #ccc", marginBottom: "8px" }}>
                    {p.image && <img src={p.image} alt={p.name} style={{ maxWidth: "80px" }} />}
                    <div>{p.name} — {p.price} ֏ {p.available ? "✅" : "❌"}</div>
                    <button onClick={() => deleteProduct(i)}>Удалить</button>
                </div>
            ))}
        </div>
        </div>
    );
}
