import { useNavigate } from "react-router-dom";

export function TaskCard({ producto }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/productos/${producto.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {producto.nombre}
      </h1>
      <p className="text-slate-400">{producto.descripcion}</p>
      <p className="text-slate-400">{producto.marca}</p>
      <p className="text-slate-400">{producto.precio}</p>
      <p className="text-slate-400">{producto.stock}</p>
      <p className="text-slate-400">{producto.categoria}</p>
    </div>
  );
}
