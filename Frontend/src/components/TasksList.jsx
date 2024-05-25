import { useEffect, useState } from "react";
import { getAllProductos } from "../Functions/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProductos() {
      const res = await getAllProductos();
      setProductos(res.data);
    }
    loadProductos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {productos.map((producto) => (
        <TaskCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
