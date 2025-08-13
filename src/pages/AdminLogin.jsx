import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [pwd, setPwd] = useState("");
    const nav = useNavigate();

    function login(e) {
        e.preventDefault();
        // простой пароль — поменяйте на свой
        if (pwd === "voske123") {
            localStorage.setItem("vl_admin_token", "ok");
            nav("/admin");
        } else {
            alert("Неверный пароль");
        }
    }

    return (
        <div style={{maxWidth:420, margin:"40px auto", padding:"0 12px"}}>
            <h2>Admin вход</h2>
            <form onSubmit={login}>
                <input
                    placeholder="Пароль"
                    type="password"
                    value={pwd}
                    onChange={e=>setPwd(e.target.value)}
                    style={{width:"100%", padding:"10px 12px", borderRadius:6, border:"1px solid #ddd"}}
                />
                <button style={{marginTop:12, padding:"10px 12px", borderRadius:6}}>Войти</button>
            </form>
        </div>
    );
}
