import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const tasksApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/productos`,
});

export const getAllProductos = () => tasksApi.get("/");

export const getProducto = (id) => tasksApi.get(`/${id}`);

export const createProducto = (producto) => tasksApi.post("/", producto);

export const updateProducto = (id, producto) => tasksApi.put(`/${id}/`, producto);

export const deleteProducto = (id) => tasksApi.delete(`/${id}`);

/* export const addToCart = (productId) => api.post(`productos/${productId}/add_to_cart/`);

export const checkout = () => api.post("pedidos/checkout/"); */