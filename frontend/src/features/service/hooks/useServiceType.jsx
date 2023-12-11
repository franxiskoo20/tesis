import { useQuery } from "@tanstack/react-query";
import { serviceOfService } from "../services/serviceOfService";

const useServiceType = () => {
  const { data } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: serviceOfService.getServicesType,
    onError: (error) => {
      console.error("Error al cargar los tipos de servicios: ", error);
    },
  });
  return { serviceType: data };
};

export default useServiceType;
