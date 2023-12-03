import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

const useRoles = () => {
  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: userService.getRoles,
    onError: (error) => {
      console.error("Error al cargar los roles: ", error);
    },
  });

  return { roles: data };
};

export default useRoles;
