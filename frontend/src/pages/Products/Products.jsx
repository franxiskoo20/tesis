import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../features/auth/hooks/useAuth";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:8000/api/prueba");
  return data;
};

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const { user } = useAuth(); // Este hook debe devolver el estado de autenticación

  if (isLoading) return <div>Cargando productos...</div>;

  if (error) return <div>Ha ocurrido un error: {error.message}</div>;

  return (
    <AuthenticatedLayout>
      <div>
        <h1>Lista de Productos {user?.name || "Usuario no disponible"}</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li> // Asumiendo que cada producto tiene un ID único
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
};

export default Products;
