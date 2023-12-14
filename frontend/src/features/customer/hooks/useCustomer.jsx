import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { adaptCustomerData } from "../adapters/adaptCustomerData";

const useCustomer = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
    onError: (error) => {
      console.error("Error al cargar los clientes: ", error);
    },
    select: (data) => data.map(adaptCustomerData),
  });
  return { customers: data, isSuccess, isLoading };
};

export default useCustomer;
