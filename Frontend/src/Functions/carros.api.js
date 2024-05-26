import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const carroApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/carros`,
});

export const getAllCarros = () => carroApi.get("/");

export const getCarro = (id) => carroApi.get(`/${id}`);

export const createCarro = (carro) => carroApi.post("/", carro);

export const updateCarro = (id, carro) => carroApi.put(`/${id}/`, carro);

export const deleteCarro = (id) => carroApi.delete(`/${id}`);

export const agregarProducto = (carroId, productoId, cantidad) => 
  carroApi.post(`/${carroId}/agregar_producto/`, { producto_id: productoId, cantidad });

export const finalizarPedido = (carroId) => 
  carroApi.post(`/${carroId}/finalizar_pedido/`);
