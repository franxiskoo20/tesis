import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";

const useBusinessType = () => {
  const { data: businessType } = useQuery({
    queryKey: ["businessType"],
    queryFn: productService.getBusinesses,
    onError: (error) => {
      console.error("Error al cargar los tipos de negocios: ", error);
    },
  });
  return { businessType };
};

export default useBusinessType;
