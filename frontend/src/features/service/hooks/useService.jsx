import { useQuery } from "@tanstack/react-query";
import { serviceOfService } from "../services/serviceOfService";

const useService = () => {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: serviceOfService.getServices,
    onError: (error) => {
      console.error("Error al cargar los servicios: ", error);
    },
  });

  return { services };
};

export default useService;