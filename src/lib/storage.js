export const LS_PRODUCTS = "vl_products";
export const LS_RESERVATIONS = "vl_reservations";

export function getProducts() {
    return JSON.parse(localStorage.getItem(LS_PRODUCTS) || "[]");
}
export function saveProducts(list) {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(list));
}
export function addProduct(p) {
    const list = getProducts();
    list.push({ id: crypto.randomUUID(), ...p });
    saveProducts(list);
}

export function getReservations() {
    return JSON.parse(localStorage.getItem(LS_RESERVATIONS) || "[]");
}
export function addReservation(r) {
    const list = getReservations();
    list.push({ id: crypto.randomUUID(), createdAt: Date.now(), ...r });
    localStorage.setItem(LS_RESERVATIONS, JSON.stringify(list));
}
