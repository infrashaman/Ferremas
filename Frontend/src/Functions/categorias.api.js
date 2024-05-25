import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const categoriasApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/categorias`,
});

export const getAllCategorias = () => categoriasApi.get("/");

export const getCategoria = (id) => categoriasApi.get(`/${id}`);

export const createCategoria = (producto) => categoriasApi.post("/", producto);

export const updateCategoria = (id, producto) => categoriasApi.put(`/${id}/`, producto);

export const deleteCategoria = (id) => categoriasApi.delete(`/${id}`);

/* export const addToCart = (productId) => api.post(`productos/${productId}/add_to_cart/`);

export const checkout = () => api.post("pedidos/checkout/"); */