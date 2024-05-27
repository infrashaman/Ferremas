import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategorias } from "../Functions/categorias.api";
import {
  createProducto,
  deleteProducto,
  getProducto,
} from "../Functions/tasks.api";
import {
  agregarProducto,
  getCarro,
  createCarro,
  finalizarPedido
} from "../Functions/carros.api";
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
  const [cantidad, setCantidad] = useState(0);
  const [carroProductos, setCarroProductos] = useState([]);

  // Fetch and update the quantity of items in the cart
  async function fetchCantidadCarroProductos() {
    const carroId = localStorage.getItem("carroId");
    if (!carroId) {
      console.log("No hay carroId en el localStorage.");
      return;
    }

    try {
      const response = await getCarro(carroId);
      console.log("Carro Response:", response.data); // Debugging log
      const productosIds = response.data.productos || [];
      let totalProductos = 0;

      // Count the occurrences of each product ID in the list
      const productCounts = {};
      productosIds.forEach((productId) => {
        productCounts[productId] = (productCounts[productId] || 0) + 1;
      });

      // Sum up the counts to get the total number of products
      Object.values(productCounts).forEach((count) => {
        totalProductos += count;
      });

      console.log("Total Productos:", totalProductos); // Debugging log
      setCantidad(totalProductos);
      setCarroProductos(response.data.productos); // Guardar los productos completos para usarlos si es necesario
    } catch (error) {
      console.error("Error fetching carro:", error);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      let carroId = localStorage.getItem("carroId");
      if (!carroId) {
        const newCarroResponse = await createCarro({ productos: [] });
        carroId = newCarroResponse.data.id;
        localStorage.setItem("carroId", carroId);
      }
      await agregarProducto(carroId, params.id, 1);
      await fetchCantidadCarroProductos();
      toast.success("Product Added to Cart", {
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
        <button
          type="submit"
          className="bg-green-500 p-3 rounded-lg block w-full mt-3"
        >
          Add to Cart ({cantidad})
        </button>
        <button
          className="bg-blue-500 p-3 rounded-lg block w-full mt-3"
          onClick={async () => {
            const carroId = localStorage.getItem("carroId");
            if (!carroId) {
              console.log("No hay carroId en el localStorage.");
              return;
            }

            try {
              await finalizarPedido(carroId);
              // Limpiar carro
              localStorage.removeItem("carroId");
              setCantidad(0);
              setCarroProductos([]);
              toast.success("Pedido finalizado", {
                position: "bottom-right",
                style: {
                  background: "#101010",
                  color: "#fff",
                },
              });
              navigate("/productos"); // o cualquier otra ruta después de finalizar el pedido
            } catch (error) {
              console.error("Error al finalizar pedido:", error);
            }
          }}
        >
          Finalizar Pedido
        </button>

        <button
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
          onClick={async (e) => {
            e.preventDefault();
            navigate("/productos");
          }}
        >
          Save
        </button>
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
      </form>
    </div>
  );
}
