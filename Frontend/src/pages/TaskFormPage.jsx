import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategorias } from "../Functions/categorias.api";
import {
  createProducto,
  deleteProducto,
  getProducto,
  updateProducto,
} from "../Functions/tasks.api";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [categorias, setCategorias] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Data before submit:", data);
    if (params.id) {
      await updateProducto(params.id, data);
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createProducto(data);
      toast.success("New Task Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/productos");
  });

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        const { data } = await getProducto(params.id);
        setValue("codigo", data.codigo);
        setValue("nombre", data.nombre);
        setValue("descripcion", data.descripcion);
        setValue("categoria", data.categoria);
        setValue("precio", data.precio);
        setValue("marca", data.marca);
        setValue("stock", data.stock);
      }
    }
    loadProducto();
  }, [params.id, setValue]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllCategorias();
      setCategorias(response.data); 
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="codigo"
          {...register("codigo", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.codigo && <span>This field is required</span>}

        <input
          type="text"
          placeholder="nombre"
          {...register("nombre", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.nombre && <span>This field is required</span>}

        <input
          type="text"
          placeholder="descripcion"
          {...register("descripcion", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.descripcion && <span>This field is required</span>}

        <select
          {...register("categoria", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        {errors.categoria && <span>This field is required</span>}

        <input
          type="text"
          placeholder="marca"
          {...register("marca", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.marca && <span>This field is required</span>}

        <input
          type="number"
          placeholder="precio"
          {...register("precio", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.precio && <span>This field is required</span>}

        <input
          type="number"
          placeholder="stock"
          {...register("stock", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.stock && <span>This field is required</span>}

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteProducto(params.id);
                toast.success("Task Removed", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/productos");
              }
            }}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}
