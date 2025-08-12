import { useEffect, useState } from "react";
import { getProducts, addReservation } from "../lib/storage.js";
import MapEmbed from "../components/MapEmbed.jsx";

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(null);
    const [form, setForm] = useState({ name:"", phone:"", date:"" });
    const [ok, setOk] = useState("");

    useEffect(() => setProducts(getProducts()), []);

    function openReserve(p) {
        setActive(p);
        setOk("");
        setForm({ name:"", phone:"", date:"" });
    }

    function submitReserve(e) {
        e.preventDefault();
        if (!active) return;
        addReservation({
            productId: active.id,
            productTitle: active.title,
            when: form.date,
            name: form.name,
            phone: form.phone,
        });
        setOk("Заявка отправлена! Скоро свяжемся.");
        setActive(null);
    }

    return (
        <div style={{maxWidth:960, margin:"24px auto", padding:"0 12px"}}>
            <h1>Voske Loxap — бронирование</h1>
            <p>Простое бронирование услуг на пляже։ Ոսկյա լողափ</p>

            <MapEmbed />

            <h2 style={{marginTop:24}}>Доступные услуги</h2>
            {products.length === 0 && <p>Пока пусто. Админ добавит товары.</p>}

            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16}}>
                {products.map(p => (
                    <div key={p.id} style={{border:"1px solid #eee", borderRadius:8, padding:12}}>
                        {p.image && <img alt={p.title} src={p.image} style={{width:"100%",height:160,objectFit:"cover",borderRadius:6}}/>}
                        <h3 style={{margin:"8px 0"}}>{p.title}</h3>
                        <p style={{opacity:.8, minHeight:48}}>{p.description}</p>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                            <b>{p.price ? `${p.price} AMD` : "Цена по запросу"}</b>
                            <span style={{fontSize:12, opacity:.8}}>
                {p.available ? "Доступно" : "Нет в наличии"}
              </span>
                        </div>
                        <button
                            onClick={() => openReserve(p)}
                            disabled={!p.available}
                            style={{marginTop:10, width:"100%", padding:"10px 12px", borderRadius:6, border:"1px solid #ddd", cursor: p.available ? "pointer":"not-allowed"}}
                        >
                            Забронировать
                        </button>
                    </div>
                ))}
            </div>

            {active && (
                <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.4)", display:"grid", placeItems:"center"}}>
                    <form onSubmit={submitReserve} style={{background:"#fff", padding:16, borderRadius:8, width:360}}>
                        <h3>Бронь: {active.title}</h3>
                        <label>Имя<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inputS}/></label>
                        <label>Телефон<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inputS}/></label>
                        <label>Дата/время<input type="datetime-local" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={inputS}/></label>
                        <div style={{display:"flex", gap:8, marginTop:8}}>
                            <button type="submit" style={btn}>Отправить</button>
                            <button type="button" onClick={()=>setActive(null)} style={btnOutline}>Отмена</button>
                        </div>
                    </form>
                </div>
            )}

            {ok && <p style={{marginTop:16, color:"green"}}>{ok}</p>}
        </div>
    );
}

const inputS = { width:"100%", padding:"8px 10px", marginTop:4, marginBottom:8, borderRadius:6, border:"1px solid #ddd" };
const btn = { padding:"10px 12px", border:"none", background:"#222", color:"#fff", borderRadius:6, cursor:"pointer" };
const btnOutline = { ...btn, background:"#fff", color:"#222", border:"1px solid #222" };
