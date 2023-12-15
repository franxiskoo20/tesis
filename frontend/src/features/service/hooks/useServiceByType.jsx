import { useQuery } from "@tanstack/react-query";
import { serviceOfService } from "../services/serviceOfService";

const useServiceByType = (id) => {

  const { data } = useQuery({
    queryKey: ["serviceByTypes", id],
    queryFn: () => serviceOfService.getServicesByType(id),
    enabled: !!id,
    onError: (error) => {
      console.error(
        "Error al cargar los servicios perteneciente a un tipo de servicio: ",
        error
      );
    },
  });

  return { serviceByType: data };
};

export default useServiceByType;