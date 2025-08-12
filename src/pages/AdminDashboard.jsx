import { useEffect, useState } from "react";
import { addProduct, getProducts, saveProducts, getReservations } from "../lib/storage.js";
import { useNavigate } from "react-router-dom";

const empty = { title:"", price:"", description:"", available:true, image:"" };

export default function AdminDashboard() {
    const [form, setForm] = useState(empty);
    const [list, setList] = useState([]);
    const [reservations, setReservations] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        setList(getProducts());
        setReservations(getReservations());
    }, []);

    function submit(e) {
        e.preventDefault();
        const priceNum = form.price ? Number(form.price) : 0;
        addProduct({ ...form, price: priceNum });
        setList(getProducts());
        setForm(empty);
    }

    function toggleAvail(id) {
        const upd = list.map(p => p.id === id ? { ...p, available: !p.available } : p);
        saveProducts(upd);
        setList(upd);
    }

    function remove(id) {
        const upd = list.filter(p => p.id !== id);
        saveProducts(upd);
        setList(upd);
    }

    function logout() {
        localStorage.removeItem("vl_admin_token");
        nav("/admin");
    }

    return (
        <div style={{maxWidth:1000, margin:"24px auto", padding:"0 12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2>Admin Dashboard</h2>
                <button onClick={logout}>Выйти</button>
            </div>

            <h3>Добавить товар/услугу</h3>
            <form onSubmit={submit} style={{display:"grid", gap:8, gridTemplateColumns:"1fr 1fr"}}>
                <input placeholder="Название" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
                <input placeholder="Цена (AMD)" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
                <input placeholder="Картинка (URL)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
                <select value={form.available ? "1":"0"} onChange={e=>setForm({...form,available:e.target.value==="1"})}>
                    <option value="1">Доступно</option>
                    <option value="0">Недоступно</option>
                </select>
                <textarea placeholder="Описание" style={{gridColumn:"1 / -1"}} rows={3}
                          value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
                <button style={{gridColumn:"1 / -1"}}>Сохранить</button>
            </form>

            <h3 style={{marginTop:24}}>Список</h3>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
                <thead>
                <tr><th align="left">Название</th><th>Цена</th><th>Статус</th><th>Действия</th></tr>
                </thead>
                <tbody>
                {list.map(p=>(
                    <tr key={p.id}>
                        <td>{p.title}</td>
                        <td align="center">{p.price}</td>
                        <td align="center">{p.available ? "✅" : "⛔"}</td>
                        <td align="center">
                            <button onClick={()=>toggleAvail(p.id)}>Переключить</button>{" "}
                            <button onClick={()=>remove(p.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3 style={{marginTop:24}}>Брони</h3>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
                <thead>
                <tr><th align="left">Услуга</th><th>Имя</th><th>Телефон</th><th>Когда</th><th>Создано</th></tr>
                </thead>
                <tbody>
                {reservations.map(r=>(
                    <tr key={r.id}>
                        <td>{r.productTitle}</td>
                        <td>{r.name}</td>
                        <td>{r.phone}</td>
                        <td>{r.when}</td>
                        <td>{new Date(r.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
